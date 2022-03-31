//! Delete

$(document).on("click", ".btn-delete", async (event) => {
  let id = event.currentTarget.id;
  await fetch(`${api}/${id}`, {
    method: "DELETE",
  });
  getProducts();
  Toastify({
    text: "Successfully delete",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background:
        "linear-gradient(90deg, rgba(37,224,112,1) 18%, rgba(3,56,244,1) 100%)",
    },
  }).showToast();
});

//!   Update

let editName = $(".edit-name");
let editSurname = $(".edit-surname");
let editNumber = $(".edit-number");
let editForm = $(".edit-form");
let editWeekKpi = $(".edit-weekkpi");
let editMonthKpi = $(".edit-monthkpi");
let editModal = $(".modal");

$(document).on("click", ".btn-edit", async (event) => {
  let id = event.currentTarget.id;
  editForm.attr("id", id);
  const responce = await fetch(`${api}/${id}`);
  const data = await responce.json();
  editName.val(data.name);
  editSurname.val(data.surname);
  editNumber.val(data.number);
  editWeekKpi.val(data.weekkpi);
  editMonthKpi.val(data.monthkpi);
});
editForm.on("submit", async (event) => {
  event.preventDefault();
  let name = editName.val().trim();
  let surname = editSurname.val().trim();
  let number = editNumber.val().trim();
  let weekkpi = editWeekKpi.val().trim();
  let monthkpi = editMonthKpi.val().trim();
  let editContact = {
    name: name,
    surname: surname,
    number: number,
    weekkpi: weekkpi,
    monthkpi: monthkpi,
  };
  let id = event.currentTarget.id;
  await fetch(`${api}/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(editContact),
  });
  getProducts();
  editModal.modal("hide");
  getProducts();
  Toastify({
    text: "Successfully changed",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background:
        "linear-gradient(90deg, rgba(37,224,112,1) 18%, rgba(3,56,244,1) 100%)",
    },
  }).showToast();
});

//! Pagination
let prevBtn = $(".prev-btn");
let nextBtn = $(".next-btn");

let postsPerPage = 6;
let currentPage = 1;
let lastPage = 1;

nextBtn.on("click", () => {
  if (currentPage === lastPage) {
    return;
  }
  currentPage++;
  getProducts();
  window.scrollTo(0, 0);
});

prevBtn.on("click", () => {
  if (currentPage === 1) {
    return;
  }
  currentPage--;
  getProducts();
  window.scrollTo(0, 0);
});
