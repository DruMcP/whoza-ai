// Hero Image Diagnostic Script
// Copy and paste this into browser console on https://whoza.ai/

(function() {
  console.log('🔍 HERO IMAGE DIAGNOSTIC SCRIPT');
  console.log('================================\n');

  // Find the hero image element
  const heroContainer = document.querySelector('.hero-image-container');
  const heroImage = heroContainer ? heroContainer.querySelector('img') : null;

  if (!heroContainer) {
    console.error('❌ PROBLEM: .hero-image-container not found in DOM');
    console.log('This means the HeroSection component is not rendering correctly');
    return;
  } else {
    console.log('✅ Hero container found');
    console.log('Container computed styles:', window.getComputedStyle(heroContainer));
  }

  if (!heroImage) {
    console.error('❌ PROBLEM: <img> element not found inside .hero-image-container');
    console.log('Container HTML:', heroContainer.innerHTML);
    return;
  } else {
    console.log('✅ Image element found');
  }

  // Check image source
  console.log('\n📍 IMAGE SOURCE');
  console.log('src attribute:', heroImage.src);
  console.log('Expected:', window.location.origin + '/hero_image.png?v=20260113');

  // Check if image is loaded
  console.log('\n📊 IMAGE STATUS');
  if (heroImage.complete) {
    if (heroImage.naturalWidth === 0) {
      console.error('❌ PROBLEM: Image loaded but has 0 dimensions (broken image)');
      console.log('This usually means:');
      console.log('- The file doesn\'t exist at the URL');
      console.log('- CORS is blocking the image');
      console.log('- The file is corrupted');
    } else {
      console.log('✅ Image loaded successfully');
      console.log('Natural dimensions:', heroImage.naturalWidth, 'x', heroImage.naturalHeight);
      console.log('Expected dimensions: 450 x 806');
    }
  } else {
    console.warn('⏳ Image is still loading...');
    heroImage.addEventListener('load', function() {
      console.log('✅ Image loaded after check');
      console.log('Dimensions:', this.naturalWidth, 'x', this.naturalHeight);
    });
    heroImage.addEventListener('error', function() {
      console.error('❌ Image failed to load');
      console.error('Failed URL:', this.src);
    });
  }

  // Check computed styles
  console.log('\n🎨 COMPUTED STYLES');
  const styles = window.getComputedStyle(heroImage);
  const criticalStyles = {
    display: styles.display,
    opacity: styles.opacity,
    visibility: styles.visibility,
    width: styles.width,
    height: styles.height,
    maxWidth: styles.maxWidth,
    position: styles.position
  };
  console.table(criticalStyles);

  // Check for potential issues
  console.log('\n🔍 POTENTIAL ISSUES');
  let issuesFound = false;

  if (styles.display === 'none') {
    console.error('❌ Image has display: none');
    issuesFound = true;
  }
  if (parseFloat(styles.opacity) === 0) {
    console.error('❌ Image has opacity: 0');
    issuesFound = true;
  }
  if (styles.visibility === 'hidden') {
    console.error('❌ Image has visibility: hidden');
    issuesFound = true;
  }
  if (parseFloat(styles.width) === 0) {
    console.error('❌ Image has width: 0');
    issuesFound = true;
  }
  if (parseFloat(styles.height) === 0) {
    console.error('❌ Image has height: 0');
    issuesFound = true;
  }

  if (!issuesFound) {
    console.log('✅ No obvious CSS issues detected');
  }

  // Test direct image access
  console.log('\n🌐 TESTING DIRECT IMAGE ACCESS');
  const testUrl = '/hero_image.png?diagnostic=' + Date.now();
  fetch(testUrl)
    .then(response => {
      console.log('Fetch status:', response.status);
      console.log('Content-Type:', response.headers.get('content-type'));
      console.log('Content-Length:', response.headers.get('content-length'));
      if (response.ok) {
        console.log('✅ Image file is accessible via fetch');
        return response.blob();
      } else {
        console.error('❌ Fetch failed with status:', response.status);
      }
    })
    .then(blob => {
      if (blob) {
        console.log('Blob size:', blob.size, 'bytes');
        console.log('Blob type:', blob.type);
        console.log('Expected: ~460000 bytes, image/png');
      }
    })
    .catch(error => {
      console.error('❌ Fetch error:', error);
    });

  // Check for Service Workers
  console.log('\n🔧 SERVICE WORKER CHECK');
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      if (registrations.length > 0) {
        console.warn('⚠️ Service Workers detected:', registrations.length);
        console.log('These might be caching an old broken image');
        console.log('To clear: DevTools → Application → Service Workers → Unregister');
        registrations.forEach((reg, i) => {
          console.log(`SW ${i+1}:`, reg.scope);
        });
      } else {
        console.log('✅ No service workers detected');
      }
    });
  }

  // Summary
  console.log('\n📋 DIAGNOSTIC SUMMARY');
  console.log('=====================');
  console.log('1. Check Network tab for hero_image.png request');
  console.log('2. Look for status 200 (success) or 404 (not found)');
  console.log('3. If 304 (cached), clear cache and hard reload (Ctrl+Shift+R)');
  console.log('4. Check Console for red error messages');
  console.log('5. Visit /test-hero-image.html for isolated testing');
  console.log('\nCopy this entire log and share for further diagnosis.');
})();
