// Đợi DOM được load hoàn toàn
document.addEventListener("DOMContentLoaded", function() {
  initializeSearchFunctionality();
});

// Hàm khởi tạo chức năng tìm kiếm
function initializeSearchFunctionality() {
  // Lấy các phần tử DOM
  const searchField = document.querySelector(".searchBar .search__field");
  const searchOverlay = document.getElementById("searchOverlay");
  
  // Kiểm tra xem các phần tử cần thiết đã được load chưa
  if (!searchField || !searchOverlay) {
    console.log("Phần tử tìm kiếm chưa được load, sẽ thử lại sau 500ms");
    setTimeout(initializeSearchFunctionality, 500);
    return;
  }
  
  const searchInput = searchOverlay.querySelector(".search__input input");
  const searchCloseBtn = searchOverlay.querySelector(".search__close");
  
  console.log("Đã tìm thấy các phần tử tìm kiếm:", {
    searchField: searchField,
    searchOverlay: searchOverlay,
    searchInput: searchInput,
    searchCloseBtn: searchCloseBtn
  });
  
  // Mở overlay khi click vào ô tìm kiếm trên trang chính
  searchField.addEventListener("click", function() {
    searchOverlay.classList.add("search__overlay--active");
    document.body.style.overflow = 'hidden'; // Tạm ẩn scroll
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 300); // Delay để đảm bảo animation đã chạy
    }
  });
  
  // Đóng overlay khi click vào nút đóng
  if (searchCloseBtn) {
    searchCloseBtn.addEventListener("click", function() {
      searchOverlay.classList.remove("search__overlay--active");
      document.body.style.overflow = 'auto'; // Khôi phục scroll
    });
  }
  
  // Đóng khi nhấn ESC
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && searchOverlay.classList.contains("search__overlay--active")) {
      searchOverlay.classList.remove("search__overlay--active");
      document.body.style.overflow = 'auto';
    }
  });
  
  // Cho phép click ngoài vùng tìm kiếm để đóng overlay
  searchOverlay.addEventListener("click", function(e) {
    // Nếu click trực tiếp vào overlay (không phải các phần tử con)
    if (e.target === searchOverlay) {
      searchOverlay.classList.remove("search__overlay--active");
      document.body.style.overflow = 'auto';
    }
  });
}

// Thêm một cách khác để đảm bảo script chạy sau khi view được load
window.addEventListener("load", function() {
  initializeSearchFunctionality();
});

// Cung cấp một hàm toàn cục để có thể gọi lại sau khi view được load
window.initSearch = function() {
  initializeSearchFunctionality();
};