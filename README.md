<div align="center">
    <img width="15%" src="./summarize-frontend/public/logo.png">
    <h1>Summarize</h1>
</div>

<div align="center">
    <b>Your Web page summarizer with AI</b>
    <p>This project makes use of <b>Browserless</b> to do web scraping of the web pages and then makes use of the Workers AI of <b>Cloudflare</b> to process the text of the pages to make a summary.</p> 
</div>

<div align="center">
    <a href="">Project Link</a>
    <br>
    <a href="">Video Link</a>
</div>

## Install

Run the next command to install the Frontend dependencies.

```bash
npm run frontend:install
```

Run the next command to install the Backend dependencies:

```bash
npm run backend:install
```

## Config

In the .env file in the summarize-frontend folder add the url of the backendIn the .env file of the summarize-frontend folder add the backend url, while in the .env file of the summarize-backend folder you have to add the Cloudflare token, the cloudflare user id and the Browserles url.

<a href="https://developers.cloudflare.com/workers-ai/get-started/rest-api/">Cloudlfare Token and User ID Guide</a>
<br>
<a href="https://docs.browserless.io/">Browserless URL Guide</a>

## Run the project

To run the Frontend project run the next command:

```bash
npm run frontend:dev
```

To run the Backend project run the next command:

```bash
npm run backend:dev
```

---

<div align="center">

Made with ❤️ by **Erik Giovani**

</div>
