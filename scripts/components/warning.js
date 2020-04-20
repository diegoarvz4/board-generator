export default (title, paragraph) => {

  return `
    <div class="warning-container">
      <div class="warning">
        <h2>${title}</h2>
        <p>
          ${paragraph} 
        </p>
        <button>Continue</button>
        <button class="btn-cancel">Cancel</button>
      </div>
    </div>
  `
}