class HeaderComponent {
  constructor(container) {
    this.container = container;
    this.headers = {
      fudo: {
        title: '<img src="/assets/images/logo.png" alt="">',
        showBackButton: false,
      },
      "san-pham": {
        title: "Sản phẩm",
        showBackButton: true,
      },
      "gio-hang": {
        title: "Giỏ hàng",
        showBackButton: true,
      },
      affiliate: {
        title: "Affiliate | Tiếp thị liên kết",
        showBackButton: true,
      },
      "bai-viet": {
        title: "Bài viết",
        showBackButton: true,
      },
      "ca-nhan": {
        title: "Cá nhân",
        showBackButton: true,
      },
      "danh-muc": {
        title: "Danh mục",
        showBackButton: true,
      },
      "don-hang": {
        title: "DS Đơn hàng",
        showBackButton: true,
      },
      voucher: {
        title: "Voucher",
        showBackButton: true,
      },
    };
  }

  render(headerType) {
    const headerConfig = this.headers[headerType];

    const header = document.createElement("div");
    header.className = "header";

    const headerLeft = document.createElement("div");
    headerLeft.className = "header__left";

    if (headerConfig.showBackButton) {
      const backButton = document.createElement("a");
      backButton.className = "back__button";
      backButton.innerHTML =
        '<img src="/assets/icon/chọn icon=back.png" alt="">';
      backButton.onclick = () => {
        window.history.back();
      };
      headerLeft.appendChild(backButton);
    }

    const title = document.createElement("div");
    const specialTitleTypes = ["affiliate"];

    if (specialTitleTypes.includes(headerType)) {
      title.className = "title text--callout--bold";
    } else {
      title.className = "title text--large-title--bold";
    }

    title.innerHTML = headerConfig.title;
    headerLeft.appendChild(title);

    const headerRight = document.createElement("div");
    headerRight.className = "header__right";

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "header__buttons";

    const menuButton = document.createElement("div");
    menuButton.className = "menu__button";
    menuButton.innerHTML = "&bull;&bull;&bull;";

    const separator = document.createElement("div");
    separator.className = "button__separator";

    const closeButton = document.createElement("div");
    closeButton.className = "close__button";
    closeButton.innerHTML = "&times;";

    buttonContainer.appendChild(menuButton);
    buttonContainer.appendChild(separator);
    buttonContainer.appendChild(closeButton);

    headerRight.appendChild(buttonContainer);

    header.appendChild(headerLeft);
    header.appendChild(headerRight);

    this.container.innerHTML = "";
    this.container.appendChild(header);
  }
}
