document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#updateForm");
  if (!form) {
    console.error("Form not found");
    return;
  }
  console.log("Form found");

  const updateBtn = form.querySelector("button[type='submit']");
  if (!updateBtn) {
    console.error("Button not found");
    return;
  }
  console.log("Button found");

  // Start with button disabled
  updateBtn.disabled = true;

  form.addEventListener("input", () => {
    console.log("Input event fired");
    updateBtn.disabled = false;
  });
});
