import os
import requests
import base64
from nacl import encoding, public

owner = "DruMcP"
repo = "whoza-ai"
token = os.environ['GitHub_TOKEN']
headers = {
    "Authorization": f"token {token}",
    "Accept": "application/vnd.github.v3+json"
}

# Get public key
url = f"https://api.github.com/repos/{owner}/{repo}/actions/secrets/public-key"
resp = requests.get(url, headers=headers)
resp.raise_for_status()
data = resp.json()
key_id = data["key_id"]
public_key = data["key"]

def encrypt_secret(secret):
    public_key_bytes = public.PublicKey(public_key.encode("utf-8"), encoding.Base64Encoder)
    sealed_box = public.SealedBox(public_key_bytes)
    encrypted = sealed_box.encrypt(secret.encode("utf-8"))
    return base64.b64encode(encrypted).decode("utf-8")

# Secrets to set (from local env files)
secrets = {
    "NEXT_PUBLIC_SUPABASE_URL": "https://ligjstpxqtkurvteyyhw.supabase.co",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": os.environ.get('NEXT_PUBLIC_SUPABASE_ANON_KEY', ''),
    "SUPABASE_SERVICE_ROLE_KEY": os.environ.get('SUPABASE_SERVICE_ROLE_KEY', ''),
    "NEXT_PUBLIC_SITE_URL": "https://whoza-ai-staging-349.netlify.app",
    "STRIPE_SECRET_KEY": os.environ.get('STRIPE_SECRET_KEY', ''),
    "RESEND_API_KEY": os.environ.get('RESEND_API_KEY', ''),
    "GOOGLE_PLACES_API_KEY": os.environ.get('GOOGLE_PLACES_API_KEY', ''),
    "PERPLEXITY_API_KEY": os.environ.get('PERPLEXITY_API_KEY', ''),
    "TRILLET_API_KEY": '',
    "TRILLET_WEBHOOK_SECRET": '',
    "TRILLET_BASE_URL": "https://api.trillet.ai/v1",
    "TRILLET_WORKSPACE_ID": "whoza-workspace",
    "TRILLET_AGENT_ID": "katie-agent",
    "WHATSAPP_PROVIDER": "trillet",
}

for name, value in secrets.items():
    if not value:
        print(f"⚠️ Skipping {name} (empty value)")
        continue
    
    encrypted_value = encrypt_secret(value)
    url = f"https://api.github.com/repos/{owner}/{repo}/actions/secrets/{name}"
    payload = {"encrypted_value": encrypted_value, "key_id": key_id}
    resp = requests.put(url, headers=headers, json=payload)
    
    if resp.status_code in [201, 204]:
        print(f"✅ {name}")
    else:
        print(f"❌ {name}: {resp.status_code} - {resp.text}")

print("\nDone. Now update the workflow to use these secrets.")
