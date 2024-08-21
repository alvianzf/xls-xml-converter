import React from "react";

function Layout({ children }) {
  return <div>{children}
  <footer style={{ left: "0", position: "absolute", bottom: '0', width: "100%", padding: "1em", textAlign: "center", fontSize: "0.5em"}}>
<p>Alvian Zachry Faturrahman</p>
  </footer>
  </div>;
}

export default Layout;
