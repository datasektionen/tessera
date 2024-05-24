const defaultHTML = `       <section class="hero-section" style="position: relative; height: 100vh; width: 100%; overflow: hidden; display: block;">
<img src="${process.env.REACT_APP_BASE_URL}/assets/default-landing-page-image.jpg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0;">
<div class="overlay" style="position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; background-color: rgba(0, 0, 0, 0.5);">
  <h1 style="color: white; font-size: 48px; font-weight: bold;">Welcome to The Annual Tech Conference</h1>
  <p style="color: white; font-size: 24px; margin-top: 20px;">Join us for a day of innovation and inspiration at TechCon 2024</p>
  <button id="buy-tickets" class="btn btn-primary btn-lg" style="margin-top: 30px;">Buy Tickets Now!</button>
</div>
</section>


<div class="container my-5">
<section id="event-details">
    <h2 class="text-center mb-4">Event Details</h2>
    <p class="text-center mb-5">Get ready to explore the latest in technology and network with industry leaders from around the globe. This event is perfect for tech enthusiasts, professionals, and anyone interested in the future of technology.</p>
    <div class="row">
        <div class="col-md-4">
            <h3>Date & Time</h3>
            <p>March 12, 2024<br>9:00 AM to 6:00 PM</p>
        </div>
        <div class="col-md-4">
            <h3>Location</h3>
            <p>Convention Center, Downtown<br>123 Event Street, San Francisco, CA</p>
        </div>
        <div class="col-md-4">
            <h3>What to Expect</h3>
            <p>Keynote speeches, panel discussions, and a tech expo showcasing the latest innovations.</p>
        </div>
    </div>
</section>

<section id="buy-tickets" class="text-center my-5">
    <h2>Secure Your Spot!</h2>
    <p>Don’t miss out on this incredible event. Secure your spot now!</p>
    <a href="#" class="btn btn-success btn-lg">Purchase Tickets</a>
</section>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
<script>
  function parallax() {
    alert('Scrolling');
    var scrollPosition = window.pageYOffset;
    var parallaxImage = document.querySelector('.hero-section img');
    var offset = scrollPosition * 0.5; // Adjust the parallax speed
    parallaxImage.style.transform = 'translateY(' + offset + 'px)';
  }

  window.addEventListener('scroll', parallax);
</script>
`;

export default defaultHTML;
