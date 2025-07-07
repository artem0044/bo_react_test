import { Header, List, Paragraph, Accordeon } from "@components/common/blocks";

const EditorComponents = ({ data }) => {
  return data.map((item) => {
    switch (item.type) {
      case "paragraph":
        return <Paragraph key={item.id} myData={item} />;
      case "header":
        return <Header key={item.id} myData={item} />;
      case "list":
        return <List key={item.id} myData={item} />;
      case "accordeon":
        return <Accordeon key={item.id} myData={item} />;
      default:
        return null;
    }
  });
};

export default EditorComponents;
