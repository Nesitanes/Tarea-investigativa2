// confg validadores

const validators = {

    password: {
        title: "Validador de contraseña",
        icon: "lock",
        label: "Introduce una contraseña",
        placeholder: "Ejemplo: Hola1234",

        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    },

    email: {
        title: "Validador de correo electrónico",
        icon: "mail",
        label: "Introduce un correo electrónico",
        placeholder: "Ejemplo: usuario@correo.com",

        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },

    phone: {
        title: "Validador de teléfono",
        icon: "smartphone",
        label: "Introduce un número de teléfono",
        placeholder: "Ejemplo: 71234567",

        regex: /^\d{8}$/
    },

    name: {
        title: "Validador de nombre",
        icon: "user",
        label: "Introduce un nombre",
        placeholder: "Ejemplo: Néstor Villalobos",

        regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/
    }

};


// elementos html
const buttons = document.querySelectorAll(".validator-btn");

const input = document.getElementById("inputText");

const inputLabel = document.getElementById("inputLabel");

const validatorTitle =
    document.getElementById("validatorTitle");

const validatorIcon =
    document.getElementById("validatorIcon");

const statusIcon =
    document.getElementById("statusIcon");

const result =
    document.getElementById("result");

const requirements =
    document.getElementById("requirements");


// validar actual

let currentValidator = "password";


// cambiar entre validadores

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const validator =
            button.dataset.validator;

        currentValidator = validator;

        changeValidator(validator);

    });

});


// cambiar información de validador

function changeValidator(type) {

    const data = validators[type];


    // Cambiar botón activo

    buttons.forEach(button => {
        button.classList.remove("active");
    });


    const activeButton =
        document.querySelector(
            `[data-validator="${type}"]`
        );

    if (activeButton) {
        activeButton.classList.add("active");
    }


    // Cambiar icono

    validatorIcon.innerHTML =
        `<i data-lucide="${data.icon}"></i>`;

    lucide.createIcons();


    // Cambiar título

    validatorTitle.textContent =
        data.title;


    // Cambiar etiqueta

    inputLabel.textContent =
        data.label;


    // Cambiar placeholder

    input.placeholder =
        data.placeholder;


    // Limpiar input

    input.value = "";


    // Mostrar requisitos solamente
    // para contraseña

    if (type === "password") {

        requirements.style.display = "block";

    } else {

        requirements.style.display = "none";

    }


    // Reiniciar resultado

    resetResult();

}


// validar al escribir

input.addEventListener("input", () => {

    validate();

});


// funcion validacion

function validate() {

    const value = input.value;

    const data =
        validators[currentValidator];


    // Si está vacio

    if (value.trim() === "") {

        resetResult();

        return;

    }


    // Aplicar expresión regular

    const isValid =
        data.regex.test(value);


    // Mostrar resultado

    if (isValid) {

        showValid();

    } else {

        showInvalid();

    }


    // Actualizar requisitos
    // solamente para contraseña

    if (currentValidator === "password") {

        updatePasswordRequirements(value);

    }

}


// mostrar resultado valido

function showValid() {

    result.className =
        "result valid";

    result.textContent =
        "✓ El texto cumple con la expresión regular.";

    statusIcon.innerHTML =
        `<i data-lucide="circle-check"></i>`;

    statusIcon.style.color =
        "var(--green)";

    lucide.createIcons();

}


// mostrar resultado invalido

function showInvalid() {

    result.className =
        "result invalid";

    result.textContent =
        "✗ El texto no cumple con la expresión regular.";

    statusIcon.innerHTML =
        `<i data-lucide="circle-x"></i>`;

    statusIcon.style.color =
        "var(--red)";

    lucide.createIcons();

}


// reiniciar resultado

function resetResult() {

    result.className =
        "result neutral";

    result.textContent =
        "Introduce un valor para comenzar.";

    statusIcon.innerHTML = "";

    resetPasswordRequirements();

}


// requisitos contraseña

function updatePasswordRequirements(password) {

    const hasLength =
        password.length >= 8;

    const hasUppercase =
        /[A-Z]/.test(password);

    const hasLowercase =
        /[a-z]/.test(password);

    const hasNumber =
        /\d/.test(password);


    updateRequirement(
        "length",
        hasLength
    );

    updateRequirement(
        "uppercase",
        hasUppercase
    );

    updateRequirement(
        "lowercase",
        hasLowercase
    );

    updateRequirement(
        "number",
        hasNumber
    );

}


// actualizar cada requisito

function updateRequirement(id, valid) {

    const element =
        document.getElementById(id);

    if (!element) return;


    if (valid) {

        element.classList.add("valid");

        element.querySelector("span").textContent =
            "✓";

    } else {

        element.classList.remove("valid");

        element.querySelector("span").textContent =
            "○";

    }

}


// reiniciar requisitos

function resetPasswordRequirements() {

    const ids = [
        "length",
        "uppercase",
        "lowercase",
        "number"
    ];


    ids.forEach(id => {

        updateRequirement(
            id,
            false
        );

    });

}


// inicializar

changeValidator("password");