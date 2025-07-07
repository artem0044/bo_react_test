export const toggleLoginModal = (isOpen) => ({
  type: "TOGGLE_LOGIN_MODAL",
  payload: isOpen,
});

export const toggleSignUpModal = (isOpen) => ({
  type: "TOGGLE_SIGNUP_MODAL",
  payload: isOpen,
});

export const toggleRecoverModal = (isOpen) => ({
  type: "TOGGLE_RECOVER_MODAL",
  payload: isOpen,
});

export const closeAllAuthModals = () => ({
  type: "CLOSE_ALL_AUTH_MODALS",
});
