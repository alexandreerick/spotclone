import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

:root {
  --primary-dark-green: #1DB954;
  --primary-light-green: #1ED760;
  --primary-white: #FFFFFF;
  --primary-black: #191414;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

body {
  -webkit-font-smoothing: antialiased;
}

html, body, #root {
  height: 100vh;
  background: linear-gradient(var(--primary-black), #141111  )
}

body,
h1,
h2,
h3,
a,
input,
textarea {
  font-family: 'Ubuntu', sans-serif;
  font-weight: 500;
  color: #FFF;
}

button {
  font-family: 'Ubuntu', sans-serif;
  font-weight: 500;
  color: #000
}
`;
