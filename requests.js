(function () {
  function callUser() {
    alert("Call the given number");
  }

  function payNow() {
    alert("Send money via JazzCash / EasyPaisa");
  }

  document.addEventListener("click", function (e) {
    var btn = e.target && e.target.closest ? e.target.closest("button[data-action]") : null;
    if (!btn) return;

    var action = btn.getAttribute("data-action");
    if (action === "call") callUser();
    if (action === "pay") payNow();
  });
})();
