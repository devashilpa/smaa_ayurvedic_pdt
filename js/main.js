$(window).on('load', function () {
  $('#loadingScreen').addClass('hidden');
  setTimeout(function () {
    $('#loadingScreen').remove();
  }, 600);
});

$(window).on('scroll', function () {
  $('.navbar').toggleClass('scrolled', $(this).scrollTop() > 50);
  $('#scrollTopBtn').toggleClass('show', $(this).scrollTop() > 500);
});

$('#scrollTopBtn').on('click', function () {
  $('html, body').animate({ scrollTop: 0 }, 600);
});

$('a[href^="#"]').on('click', function (e) {
  const target = $($(this).attr('href'));
  if (target.length) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: target.offset().top - 70 }, 700);
  }
});

AOS.init({
  duration: 900,
  once: true,
  easing: 'ease-out-cubic'
});

const testimonials = $('.testimonial-card');
let currentTestimonial = 0;
setInterval(function () {
  testimonials.removeClass('active');
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  testimonials.eq(currentTestimonial).addClass('active');
}, 5000);

$('.gallery-item a').on('click', function (e) {
  e.preventDefault();
  const src = $(this).data('src');
  $('#lightbox-img').attr('src', src);
  $('#lightbox').addClass('show');
});

$('#lightbox').on('click', function () {
  $(this).removeClass('show');
});

const counterElements = document.querySelectorAll('.counter-number');
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = Number(el.getAttribute('data-target'));
      let current = 0;
      const duration = 1600;
      const increment = Math.ceil(target / (duration / 16));
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = `${target}+`;
          clearInterval(timer);
        } else {
          el.textContent = `${current}+`;
        }
      }, 16);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.7 });

counterElements.forEach(counter => observer.observe(counter));

const categoryData = {
  eyeCare: {
    title: 'Eye Care Products',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    description: 'Ayurvedic eye care essentials for soothing, brightening, and protecting delicate eyes.',
    items: ['Kajal – 01 to 06 nos.', 'Suruma – 01 nos.']
  },
  hairCare: {
    title: 'Hair Care Products',
    image: 'https://images.unsplash.com/photo-1492447166138-50c3889fccb1?auto=format&fit=crop&w=900&q=80',
    description: 'Hair strengthening and nourishment products for healthy roots, shine, and scalp balance.',
    items: ['Herbal Shampoo – 01-06 to 11 nos.', 'Hair Growth Oil – 01 to 06 nos.', 'Hair Gel – 01 nos.']
  },
  lipFaceCare: {
    title: 'Lip / Face Care Products',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80',
    description: 'Gentle face and lip care treatments to hydrate, protect, and refresh skin daily.',
    items: ['Lip Balm – 01-02 to 06 nos.', 'Moisturizing Cream – 01 to 06 nos.', 'Sun Cream – 01 nos.', 'Face Wash – 01 nos to 06 nos.']
  },
  bodyCare: {
    title: 'Body Care Products',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    description: 'Aromatic body care essentials designed to hydrate, soothe, and restore the skin.',
    items: ['Aromatic Body Oils – 01 to 16 nos.', 'Moisturizing Cream – 01 to 06 nos.', 'Body Pack – 01 to 06 nos.', 'Body Scrub – 01 to 06 nos.']
  },
  footCare: {
    title: 'Foot Care Products',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80',
    description: 'Targeted foot repair and refresh products for soft, healthy feet.',
    items: ['Crack Foot Cream – 01 nos.', 'Foot Care Spray – 01 nos.', 'Foot Care Oil – 01 nos.']
  },
  aromas: {
    title: 'Aromas / Perfumes',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80',
    description: 'Natural aroma blends and perfumes crafted to uplift the senses and calm the mind.',
    items: ['Aromas / Perfumes – 01 to 16 nos.']
  }
};

function showCategoryDetails(key) {
  const category = categoryData[key];
  if (!category) return;
  $('#detailImage').attr('src', category.image).attr('alt', category.title);
  $('#detailTitle').text(category.title);
  $('#detailDescription').text(category.description);
  $('#detailCategory').val(category.title);
  $('#detailItems').html(category.items.map(item => `<li>${item}</li>`).join(''));
  $('.category-card').removeClass('active');
  $(`.category-card[data-category="${key}"]`).addClass('active');
  $('#categoryDetails').fadeIn();
}

$('.category-card').on('click keypress', function (e) {
  if (e.type === 'keypress' && e.key !== 'Enter' && e.key !== ' ') return;
  const categoryKey = $(this).data('category');
  showCategoryDetails(categoryKey);
});

$('#categoryInquiryForm').on('submit', function (e) {
  e.preventDefault();
  const category = $('#detailCategory').val();
  alert(`Thank you! Your inquiry for ${category} has been sent.`);
  this.reset();
});

// Modal behavior removed; category navigation now uses separate pages.