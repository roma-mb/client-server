import Utils from "../helpers/Utils.js";
import User from "../models/User.js";

export default class UserController {
  constructor(formId, formUpdateId, tableBodyId) {
    this._photo = "";
    this.form = document.getElementById(formId);
    this.editForm = document.getElementById(formUpdateId);
    this.tableBody = document.getElementById(tableBodyId);
    this.currentTableRow = "";
    this.user = new User();

    this.submitFormEvent();
    this.editFormEvent();
    this.fillUsers();
  }

  submitFormEvent() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      let userData = this.getUserData(this.form);

      if (Utils.isEmpty(userData)) return;

      this.getUrlPhoto((error, result) => {
        if(error) {
          alert(`Upload photo error: ${error}`);
          return;
        }

        userData.photo = result;

        userData.save().then(data => {
          this.appendUser(document.createElement("tr"), JSON.parse(data));
        }).catch(error => {
          console.log(error);
        });
        
        this.appendStatistic();
      });

      this.form.reset();
    });
  }

  editFormEvent() {
    this.editForm.addEventListener("submit", (event) => {
      event.preventDefault();

      let userData = this.getUserData(this.editForm);
      let oldUser = JSON.parse(this.currentTableRow.dataset.user);
      // userData = Object.assign({}, oldUser, userData);
      userData.register = new Date();

      this.getUrlPhoto((error, result) => {
        if(error) {
          alert(`Upload photo error: ${error}`);
          return;
        }

        userData._photo = userData._photo.length > 0 ? result : oldUser._photo;

        userData.save().then(data => {
          this.appendUser(this.currentTableRow, JSON.parse(data), true);
        }).catch(error => {
          console.log(error);
        });
      });

      this.appendStatistic();
      this.editForm.reset();
      this.showForms({ edit: "none" });
    });

    this.editForm
      .querySelector(".btn-cancel-edit")
      .addEventListener("click", (event) => {
        this.showForms({ edit: "none" });
      });
  }

  getUserData(form) {
    let user = {};
    let required = ["name", "email", "password"];
    let isValid = true;

    [...form.elements].forEach((field) => {
      if (field.name === "gender" && !field.checked) {
        return;
      }

      if (required.indexOf(field.name) > -1 && !field.value) {
        isValid = false;
        field.parentElement.classList.add("has-error");
      }

      if (field.name === "photo") {
        this._photo = field;
      }

      if (field.name === "admin") {
        field.value = field.checked;
      }

      user[field.name] = field.value;
    });

    if (!isValid) {
      return {};
    }

    return new User(
      form.dataId,
      user.name,
      user.gender,
      user.birth,
      user.country,
      user.email,
      user.password,
      user.photo,
      user.admin
    );
  }

  getUrlPhoto(callback) {
    let fileRead = new FileReader();
    let file = this._photo.files[0];

    if (!file) {
      return callback(null, 'dist/img/boxed-bg.jpg');
    }

    fileRead.readAsDataURL(file);
    fileRead.onload = () => callback(null, fileRead.result);
    fileRead.onerror = (error) => callback(error, null);
  }

  getPhoto() {
    let fileRead = new FileReader();
    let file = this._photo.files[0];

    return new Promise((resolve, reject) => {
      if (!file) {
        return resolve("dist/img/boxed-bg.jpg");
      }

      fileRead.readAsDataURL(file);

      fileRead.onload = () => {
        resolve(fileRead.result);
      };

      fileRead.onerror = (error) => {
        reject(error);
      };
    });
  }

  appendUser(tableRow, user, isUpdate = false) {
    tableRow.dataset.user = JSON.stringify(user);
    let date = new Date(user.register ?? user._register);
    
    tableRow.innerHTML = `
                <td><img src="${
                  user.photo ?? user._photo
                }" alt="User Image" class="img-circle img-sm"></td>
                <td>${user.name ?? user._name}</td>
                <td>${user.email ?? user._email}</td>
                <td>${
                  (user.admin ?? user._admin) == "true" ? "Sim" : "Não"
                }</td>
                <td>${Utils.formatDate(
                  date,
                  "dd/mm/yyyy h:m:s"
                )}</td>
                <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat btn-edit">Edit</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat btn-exclude">Exclude</button>
                </td>
        `;

    this.addEventOnCurrentRow(tableRow);

    if (isUpdate) return;

    this.tableBody.appendChild(tableRow);

    this.appendStatistic();
  }

  addEventOnCurrentRow(tableRow) {
    tableRow.querySelector(".btn-edit").addEventListener("click", (event) => {
      this.currentTableRow = tableRow;
      let user = JSON.parse(tableRow.dataset.user);
      this.addValuesInForm(this.editForm, user);
      this.showForms({ create: "none" });
    });

    tableRow
      .querySelector(".btn-exclude")
      .addEventListener("click", (event) => {
        if (confirm("Do you really want to delete?")) {
          const user = this.user.loadFromJSON(tableRow.dataset.user);

          user.delete().then(data => {
            tableRow.remove();
            this.appendStatistic();
          }).catch(error => console.warn(error))
        }
      });
  }

  addValuesInForm(form, object) {
    form.dataId = object._id ?? null;

    [...form.elements].forEach((field) => {
      let currentAttribute = object[`_${field.name}`] ?? "";

      if (field && ["file", "radio"].indexOf(field.type) < 0) {
        field.value = currentAttribute;
      }

      if (field.type === "checkbox") {
        field.checked = currentAttribute == "true" ?? false;
      }

      if (field.type === "radio") {
        if (field.value == currentAttribute) field.checked = true;
      }
    });

    let imgElement = form.querySelector(".img-form-edit");

    if (imgElement) {
      imgElement.src = object._photo;
    }
  }

  showForms(object) {
    document.querySelector(".box-success-create").style.display =
      object["create"] ?? "";
    document.querySelector(".box-success-edit").style.display =
      object["edit"] ?? "";
  }

  appendStatistic() {
    document.getElementById("users-quantity").innerHTML =
      this.tableBody.childElementCount;
    document.getElementById("admins-quantity").innerHTML = this.countAdmins();
  }

  countAdmins() {
    let countAdmins = 0;

    [...this.tableBody.children].forEach((tableRow) => {
      let user = JSON.parse(tableRow.dataset.user);
      if (user._admin == "true") countAdmins++;
    });

    return countAdmins;
  }

  fillUsers() {
    this.user.findAll().then((response) => {
      let data = JSON.parse(response);

      data.forEach((user) => {
        this.appendUser(document.createElement("tr"), user);
      });
    }).catch((error) => {
      console.log(error);
    });
  }
}
