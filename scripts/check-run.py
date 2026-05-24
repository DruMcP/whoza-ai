import sys,json
data=json.load(sys.stdin)
for j in data.get('jobs',[]):
    print(f"Job: {j['name']} - Status: {j['status']} - Conclusion: {j.get('conclusion','N/A')}")
    if j.get('conclusion') == 'failure':
        print(f"  Failed job ID: {j['id']}")
        print(f"  URL: {j['html_url']}")
