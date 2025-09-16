window.addEventListener('DOMContentLoaded', () => {
	const path = window.location.pathname;
	const isTopPage = path.endsWith('index.html') || path === '/';

	/************ハンバーガーメニューは全ページ共通************/
	const menuBtn = document.querySelector('.menu-btn');
	const menu = document.querySelector('.menu');
	if (menuBtn && menu) {
		menuBtn.addEventListener('click', () => {
    		menuBtn.classList.toggle('active');
      		menu.classList.toggle('active');
    	});
  	}

	/************トップに戻るボタンは全ページ共通************/
	const backToTop = document.getElementById('back-to-top');

	if (!backToTop) return; // 要素がなければ処理を止める

	// スクロールで表示・非表示
	window.addEventListener('scroll', () => {
  		if (window.scrollY > 1) { // 10px以上スクロールしたら表示
    		backToTop.style.display = 'block';
  		} else {
    		backToTop.style.display = 'none';
  		}
	});

	// クリックでトップにスクロール
	backToTop.addEventListener('click', () => {
  		window.scrollTo({ top: 0, behavior: 'smooth' });
	});


  /************TOPページだけローディング処理************/
  if (!isTopPage) return;

  const loading = document.getElementById('loading-screen');
  const main = document.getElementById('main-content');
  const mvText = document.querySelector('.mv-text');

  if (!loading || !main) return;

	const fadeOutLoading = () => {
    	loading.style.transition = "opacity 0.5s ease";
    	loading.style.opacity = 0;


		setTimeout(() => {
			[main, document.querySelector('main')].forEach(el => {
				if(el){
					el.style.display = "block";
					el.style.opacity = 0;
					el.style.transition = "opacity 0.5s ease";
					setTimeout(() => el.style.opacity = 1,50);
				}
			});
			sessionStorage.setItem("visited", "true");
		},500);
  	};

  const isFirstVisit = !sessionStorage.getItem("visited");
  const hasHash = window.location.hash;

	if (hasHash || !isFirstVisit) {
		loading.style.display = "none";
		main.style.display = "block";

 	   if (mvText) mvText.classList.add('show');

		if (hasHash) {
    		const target = document.querySelector(window.location.hash);
    		if (target) target.scrollIntoView({ behavior: "smooth" });
    	}
	} else {
		window.addEventListener("load", () => {
    		loading.style.display = "flex";

    		if (mvText) {
    			setTimeout(() => mvText.classList.add('show'), 300);
    		}

    		setTimeout(fadeOutLoading, 1500);
    	});
  	}

  /************すきなもの************/
	const sliders = document.querySelectorAll('.likes-grid');

	sliders.forEach(slider => {
  		slider.addEventListener('click', () => {
    		slider.classList.toggle('paused'); // クリックで paused を切り替え
  		});

  		slider.addEventListener('touchstart', (e) => {
    		e.preventDefault(); // タッチ時のクリック二重発火防止
    		slider.classList.toggle('paused'); // タップで paused 切替
  		});
	});
});