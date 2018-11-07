import UrlPattern from 'url-pattern'
import draftToHtml from 'draftjs-to-html'
//redux
import * as postsActionCreators from '~redux/posts/actionCreators'
import * as visitorCardsActionCreators from '~redux/visitorCards/actionCreators'
import configureStore from '~redux/configureStore'
//db
import VisitorCard from '~db/models/visitorCard'
import Post from '~db/models/post'
import Comment from '~db/models/comment'
import Reply from '~db/models/reply'

const getStoreWithPosts = async () => {
    const postsQueryOptions = {
        filter : { isPublished : true },
        populate : { path : 'author', select : '-_id nick profileImgSrc' },
        sort : { createdDate : -1 },
    }

    const posts = await Post
    .find(postsQueryOptions.filter)
    .sort(postsQueryOptions.sort)
    .populate(postsQueryOptions.populate)

    const postsWithDescription = posts.map((post) => {
        const description = draftToHtml(post.contentState)
        const postWithDescription = post.toObject()
        postWithDescription.description = description
        delete postWithDescription.contentState
        return postWithDescription
    })

    const commentsQueryOptions = {
        populate : { path : 'memberAuthor', select : '-_id nick profileImgSrc unique_id' }
    }

    const comments = await Comment
    .find()
    .populate(commentsQueryOptions.populate)

    const repliesQueryOptions = {
        populate : { path : 'memberAuthor', select : '-_id nick profileImgSrc unique_id' }
    }

    const replies = await Reply
    .find()
    .populate(repliesQueryOptions.populate)

    const store = configureStore()
    store.dispatch(postsActionCreators.receivedPosts({
        posts : postsWithDescription,
        comments,
        replies,
    }))

    return store                
}

const preLoadedRoutes = [
    {
        pattern : new UrlPattern('/visitors'),
        getStore : async () => {
            const sortOption = { createdDate : - 1 }
            const populateOption = { path : 'memberAuthor', select : '-_id nick profileImgSrc'}
            const visitorCards = await VisitorCard
            .find()
            .sort(sortOption)
            .populate(populateOption)
            
            const store = configureStore()
            store.dispatch(visitorCardsActionCreators.receivedVisitorCards({ visitorCards}))

            return store
        }
    },
]

const getPreLoadedState = async (url) => {
    for(let i = 0; i < preLoadedRoutes.length; i++){
        const matchingResult = preLoadedRoutes[i].pattern.match(url)
        if(!Boolean(matchingResult)){ 
            continue
        }
        
        const store = preLoadedRoutes[i].getStore(matchingResult)
        return store
    }

    return await getStoreWithPosts()
}

export default getPreLoadedState


// import UrlPattern from 'url-pattern'
// //redux
// import * as postsActionCreators from '~redux/posts/actionCreators'
// import configureStore from '~redux/configureStore'
// //db
// import Post from '~db/models/post'

// const preLoadedRoutes = [
//     {
//         pattern : new UrlPattern('/'),
//         getStore : async (matchingResult) => {
//             return configureStore()
//         }
//     },
//     {
//         pattern : new UrlPattern('/post/:postId'),
//         getStore : async (matchingResult) => {
//             const postId = matchingResult.postId

//             const postsQueryOptions = {
//                 filter : {
//                     _id : postId,
//                     isPublished : true,
//                 },
//                 populate : {
//                     path : 'author',
//                     select : '-_id nick profileImgSrc',
//                 },
//             }
    
//             const post = await Post.findOne(postsQueryOptions.filter)
//             .populate(postsQueryOptions.populate)
//             .lean()

//             const store = configureStore()
//             store.dispatch(postsActionCreators.receivePost({
//                 post_id : postId,
//                 post,
//             }))

//             return store                
//         }
//     },
//     {
//         pattern : new UrlPattern('/visitors'),
//         getStore : async (matchingResult) => {
//             return configureStore()
//         }
//     }
// ]

// const getPreLoadedState = async (url) => {
//     for(let i = 0; i < preLoadedRoutes.length; i++){
//         const matchingResult = preLoadedRoutes[i].pattern.match(url)
//         if(!Boolean(matchingResult)){ 
//             continue
//         }
        
//         const store = preLoadedRoutes[i].getStore(matchingResult)
//         return store
//     }
//     return configureStore()
// }

// export default getPreLoadedState
