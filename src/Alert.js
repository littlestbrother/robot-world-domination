const alert = (str) => {
  return (
    <section>
      <button
        type="button"
        className="nes-btn is-primary"
        onclick="document.getElementById('dialog-dark').showModal();"
      >
        Open dark dialog
      </button>
      <dialog className="nes-dialog is-dark" id="dialog-dark">
        <form method="dialog">
          <p className="title">Dark dialog</p>
          <p>{str}</p>
          <menu className="dialog-menu">
            <button className="nes-btn is-primary">Ok</button>
          </menu>
        </form>
      </dialog>
    </section>
  );
};

export default alert;