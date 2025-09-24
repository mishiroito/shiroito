window.addEventListener('DOMContentLoaded', () => {
	const path = window.location.pathname;
	const isTopPage =
		path.endsWith('index.html') ||
		path === '/' ||
		path.endsWith('/shiroito/'); // ← GitHub Pagesのトップページ対応

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

	// フェードアウト関数
	const fadeOutLoading = () => {
    	loading.style.transition = "opacity 0.5s ease";
    	loading.style.opacity = 0;


		setTimeout(() => {
			// ローディング画面を完全に非表示にする
			loading.style.display = "none";

			// メインコンテンツ表示
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
    			setTimeout(() => mvText.classList.add('show'));
    		}

    		setTimeout(fadeOutLoading, 1500);
    	});
  	}


  /************すきなもの************/
(function() {
  let speed = 5000;

  const mySwiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 'auto',
    speed: speed,
    spaceBetween: 10,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
  });

  let getTranslate;

  document.querySelectorAll('.swiper').forEach(function(e){

    // タップで一時停止
    e.addEventListener('touchstart', function () {
      getTranslate = mySwiper.getTranslate();
      mySwiper.setTranslate(getTranslate);
      mySwiper.setTransition(0);
    });

    // 指を離したら再開
    e.addEventListener('touchend', function () {
      getTranslate = mySwiper.getTranslate();

      let activeSlide = document.querySelector('.swiper-slide-active');

      let getSlideWidthMgLeft = parseFloat(activeSlide.style.marginLeft) || 0;
      let getSlideWidthMgRight = parseFloat(activeSlide.style.marginRight) || 0;
      let getSlideWidth = activeSlide.offsetWidth;

      let getTotalSlideWidth = getSlideWidthMgLeft + getSlideWidthMgRight + getSlideWidth;
      let diff = - getTotalSlideWidth - (getTranslate % getTotalSlideWidth);
      let diffTime = diff / -getSlideWidth;
      mySwiper.setTranslate(getTranslate + diff);
      mySwiper.setTransition(speed * diffTime);
    });

    // 指を外で離した場合も再開
    e.addEventListener('touchcancel', function () {
      mySwiper.autoplay.start();
    });
  });
})();


});
