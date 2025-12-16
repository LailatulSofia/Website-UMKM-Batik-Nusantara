$(function () {
  // Event 1: klik tombol
  $("#btnTop").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 300);
  });

  // Event 2: hover gambar
  $(".hover-zoom").hover(
    function () { $(this).css("transform", "scale(1.03)"); },
    function () { $(this).css("transform", "scale(1)"); }
  );

  // Event 3: ketik di input
  $("#searchProduk").on("keyup", function () {
    console.log("User mengetik");
  });
});
