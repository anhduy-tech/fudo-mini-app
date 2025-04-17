const app = document.getElementById("app");
const headerContainer = document.getElementById("header-container");
const headerComponent = new HeaderComponent(headerContainer);

let currentPath = null;
let currentScript = null;

const routes = {
  "/home": {
    view: "/views/home.html",
    header: "fudo"
  },
  "/products": {
    view: "/views/products.html",
    header: "san-pham"
  },
  "/cart": {
    view: "/views/cart.html",
    header: "gio-hang"
  },
  "/order": {
    view: "/views/order.html",
    header: "don-hang"
  },
  "/blog": {
    view: "/views/blog.html",
    header: "bai-viet"
  },
  "/voucher": {
    view: "/views/voucher.html",
    header: "voucher"
  },
  "/affiliate": {
    view: "/views/affiliate.html",
    header: "affiliate"
  },
  "/user": {
    view: "/views/user.html",
    header: "ca-nhan"
  },
  "/categories": {
    view: "/views/categories.html",
    header: "danh-muc"
  }
  
};

function loadScript(scriptUrl) {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.onload = () => {
      currentScript = scriptUrl;
      resolve();
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function updateActiveMenu(path) {
  const menuItems = document.querySelectorAll('.menubar__item');
  menuItems.forEach(item => {
    item.classList.remove('active');
  });

  const pathToHrefMap = {
    '/home': '#',
    '/products': '#/products',
    '/cart': '#/cart',
    '/order': '#/order',
    '/user': '#/user'
  };

  const currentHref = pathToHrefMap[path] || '#';
  
  const activeItem = document.querySelector(`.menubar__item[href="${currentHref}"]`);
  if (activeItem) {
    activeItem.classList.add('active');
  }
}

function unloadCurrentScript() {
  if (currentScript) {
    const scripts = document.querySelectorAll(`script[src="${currentScript}"]`);
    scripts.forEach(script => {
      if (script.hasAttribute("data-route-script")) {
        script.remove();
      }
    });
    currentScript = null;
  }
}

async function loadView(path) {
  if (path === currentPath) return;

  const route = routes[path] || routes["/home"];
  
  headerComponent.render(route.header);

  try {
    const cacheBuster = `?t=${new Date().getTime()}`;
    const res = await fetch(route.view + cacheBuster);
    
    if (!res.ok) throw new Error("View not found");
    
    const html = await res.text();
    app.innerHTML = html;

    unloadCurrentScript();
    
    if (route.script) {
      await loadScript(route.script + cacheBuster);
    }

    currentPath = path;
    
    window.scrollTo(0, 0);
    
  } catch (err) {
    console.error("Failed to load view:", err);
    app.innerHTML = "<h2>404 - View not found</h2>";
  }
}

function router() {
  const hash = window.location.hash || "#/home";
  const path = hash.replace("#", "");
  
  if (path !== currentPath) {
    loadView(path);
    updateActiveMenu(path); 
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
