import { MARKDOWN } from '../../../../constants/PageContentFormat'
import Markdown from '../../Markdown'

const renderPageContent = (pageContent) => {
  if (pageContent.format === MARKDOWN) {
    return <Markdown>{pageContent.content}</Markdown>
  }
  throw new Error(`Unsupported format for page content '${pageContent.format}'`)
}

export default renderPageContent
