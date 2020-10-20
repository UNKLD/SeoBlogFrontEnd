import { DiscussionEmbed } from 'disqus-react'
import {DISQUS_SHORTNAME, DOMAIN} from '../config';

const DisqusTread = ( { post } ) => {

const disqusShortname = DISQUS_SHORTNAME
const disqusConfig = {
url: `${DOMAIN}/blogs/${post.slug}`,
identifier: post.id,  //Single post id
title : post.title // Single post title
}

return (
<div>
  <DiscussionEmbed
    shortname ={ disqusShortname}
    config = { disqusConfig }
  />
</div>
 )
}
export default DisqusTread
