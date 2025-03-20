// API: https://api.freeapi.app/api/V1/public/quotes/quote/random

const background = document.getElementById("background");

const quote = document.getElementById("quote");
const author = document.getElementById("author");

const newQuoteBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy");
const exportBtn = document.getElementById("export");
const twitterShareBtn = document.getElementById("tweet");
const whatsappShareBtn = document.getElementById("share");

// event listeners for buttons

newQuoteBtn.addEventListener("click", getQuote);
copyBtn.addEventListener("click", copyQuote);
// exportBtn.addEventListener("click", exportQuote);
twitterShareBtn.addEventListener("click", shareOnTwitter);
whatsappShareBtn.addEventListener("click", shareOnWhatsApp);

// images for background

const images = [
  "https://images.unsplash.com/photo-1742144897659-8a3e8a0a090c?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1742217279960-977bb5d13f75?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1742275346989-2d696fa2c9b3?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1741851373479-b43efb3b6e54?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1741851374718-0d26633acbf3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1742040949505-95d2c3f0941d?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1741705877369-d07743ad1010?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1741807117240-0aee0cd41d25?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1741850820078-bd14aa710eef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

// get quote from API on new quote button click

function getQuote() {
  fetch("https://api.freeapi.app/api/V1/public/quotes/quote/random")
    .then((response) => response.json())
    .then((data) => {
      const randomImage = Math.floor(Math.random() * images.length);
      background.style.backgroundImage = `url(${images[randomImage]})`;
      quote.textContent = data.data.content;
      author.textContent = "- " + data.data.author;
    });
}

getQuote(); // get quote on page load

// display message on quote copy
function displayMessage() {
  const copiedDiv = document.createElement("div");
  copiedDiv.style.position = "absolute";
  copiedDiv.style.top = `${event.clientY}px`;
  copiedDiv.style.left = `${event.clientX}px`;
  copiedDiv.style.backgroundColor = "black";
  copiedDiv.style.color = "white";
  copiedDiv.style.padding = "10px";
  copiedDiv.style.borderRadius = "5px";
  copiedDiv.textContent = "Quote copied to clipboard";
  document.body.appendChild(copiedDiv);
  setTimeout(() => {
    copiedDiv.remove();
  }, 2 * 1000);
  copiedDiv.addEventListener("click", () => {
    copiedDiv.remove();
  });
}

// copy quote & author on copy button click
function copyQuote() {
  const quoteText = quote.textContent;
  const authorText = author.textContent;
  navigator.clipboard.writeText(
    `Quote : "${quoteText}" \nAuthor : ${authorText}`
  );
  // call function to display message
  displayMessage();
}

// export quote & author on export button click in the form of image file wth background image

function exportQuote() {
  const quoteText = quote.textContent;
  const authorText = author.textContent;
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const context = canvas.getContext("2d");
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  context.fillStyle = "black";
  context.font = "20px Arial";
  context.fillText(quoteText, 20, 20);
  context.fillText(authorText, 20, 40);
  const link = document.createElement("a");
  link.download = "quote.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// share quote on linkedin on twitter share button click
function shareOnTwitter() {
  const quoteText = quote.textContent;
  const authorText = author.textContent;
  const tweetUrl = `https://twitter.com/intent/tweet?text=""Quote : ${quoteText}" \nAuthor : ${authorText}`;
  window.open(tweetUrl, "_blank");
}

// share quote on whatsapp on whatsapp share button click
function shareOnWhatsApp() {
  const quoteText = quote.textContent;
  const authorText = author.textContent;
  const whatsappUrl = `https://wa.me/?text="Quote : ${quoteText}" \nAuthor : ${authorText}`;
  window.open(whatsappUrl, "_blank");
}
