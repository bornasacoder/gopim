function TextToHtml(props) {
  const htmlContent = "<h1>Hello, world!</h1>";
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default TextToHtml;
