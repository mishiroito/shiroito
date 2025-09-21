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
  const loading = document.getElementById("loading-screen");
  const main = document.getElementById("main-content");
  const mvText = document.querySelector(".mv-text");

  // ローディング要素がなければ main を即表示
  if (!main) return;
  if (!loading) {
    main.style.display = "block";
    return;
  }

  // ローディングを表示
  loading.style.display = "flex";

  // キャッチコピーをフェードイン
  if (mvText) {
    setTimeout(() => {
      mvText.classList.add("show"); // CSS側で opacity:1 になるように
    }, 500); // 0.5秒後に表示
  }

  // ローディング終了 → main 表示
  setTimeout(() => {
    loading.style.transition = "opacity 0.5s ease";
    loading.style.opacity = 0;

    setTimeout(() => {
      loading.style.display = "none";
      main.style.display = "block";
      main.style.opacity = 0;
      main.style.transition = "opacity 0.5s ease";
      setTimeout(() => (main.style.opacity = 1), 50);
    }, 500);
  }, 2000); // 2秒くらいローディングを見せる

  /************すきなもの************/
	const sliders = document.querySelectorAll('.likes-grid');

	sliders.forEach(slider => {
		slider.addEventListener('click', () => {
    		slider.classList.toggle('paused');
 		});

  		slider.addEventListener('touchstart', (e) => {
			e.preventDefault(); // ← click と二重で走らないように
    		slider.classList.toggle('paused');
  		});
	});

	document.querySelectorAll('.like-item').forEach(item => {
  		item.addEventListener('click', () => {
    		item.classList.toggle('active');
  		});
	});

});
