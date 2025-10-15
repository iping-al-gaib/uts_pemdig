// Component loader for header and footer, mobile nav, and helpers
(function() {
	function includeComponent(selector, filePath, callback) {
		var container = document.querySelector(selector);
		if (!container) { if (callback) callback(); return; }
		fetch(filePath).then(function(res){ return res.text(); }).then(function(html){
			container.innerHTML = html;
			if (callback) callback();
		}).catch(function(){ if (callback) callback(); });
	}

	function initMobileNav() {
		var hamburger = document.getElementById('hamburger');
		var navMenu = document.getElementById('navMenu');
		if (!hamburger || !navMenu) return;
		hamburger.addEventListener('click', function() { navMenu.classList.toggle('active'); });
		Array.prototype.forEach.call(navMenu.querySelectorAll('a'), function(link){
			link.addEventListener('click', function(){ navMenu.classList.remove('active'); });
		});
	}

	function setYear() {
		var y = document.getElementById('year');
		if (y) y.textContent = new Date().getFullYear();
	}

	// Public API to load header and footer
	window.NafaraUI = {
		loadShell: function() {
			includeComponent('#app-header', '/nafara/components/header.html', function(){ initMobileNav(); });
			includeComponent('#app-footer', '/nafara/components/footer.html', function(){ setYear(); });
		},
		filterTenant: function(category) {
			var grid = document.getElementById('tenantGrid');
			if (!grid) return;
			Array.prototype.forEach.call(grid.children, function(card){
				var cat = card.getAttribute('data-category');
				if (category === 'all' || category === cat) {
					card.style.display = '';
				} else {
					card.style.display = 'none';
				}
			});
			Array.prototype.forEach.call(document.querySelectorAll('.filter-btn'), function(btn){ btn.classList.remove('active'); });
			var active = document.querySelector('[onclick*="' + category + '"]');
			if (active) active.classList.add('active');
		},
		whatsappOrder: function(payload) {
			var phone = payload.phone || '6281234567890';
			var text = encodeURIComponent(payload.message || 'Halo Nafara, saya ingin memesan.');
			var url = 'https://wa.me/' + phone + '?text=' + text;
			window.open(url, '_blank');
		}
	};

	document.addEventListener('DOMContentLoaded', function(){
		if (window.NafaraUI) window.NafaraUI.loadShell();
	});
})();



