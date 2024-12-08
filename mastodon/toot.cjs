// add required deps
const Masto = require('mastodon')
const fs = require('fs')
const glob = require('glob')
const { resolve, join, path } = require('path')
const matter = require('gray-matter')

// grab our token to make API requests
const { MASTODON_AUTH_TOKEN } = process.env

// initialize our Mastodon API client
const client = new Masto({
    access_token: MASTODON_AUTH_TOKEN,
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
})

// Get our posts and find the latest one
const getAllPosts = () => {

    let latestFile
    let sortedFiles = []
    let metaData

    // use glob and cwd (current working directory) to grab all of our posts
    glob(
        '**/*.md',
        { cwd: '../themes/charlolamode/content/blog/' },
        async function (er, files) {
            const filesArray = (array) => {
                const promises = array.map(async (file) => {
                    const content = fs.readFileSync(
                        resolve(join('../public/images/', file))
                    )
                    return {
                        file: file,
                        meta: await matter(content),
                    }
                })
                return Promise.all(promises)
            }

            const allFiles = await filesArray(files)

            let filesToSort = allFiles.map((file) => {
                const time = new Date(file.meta.data.publishDate)
                return {
                    file: file,
                    time: time,
                }
            })

            latestFile = getLatestFile(filesToSort) // getLatesFile() is below

            metaData = async (latestFile) => {
                const filePath = '../themes/charlolamode/content/blog/' + latestFile.file.file
                const n = filePath.lastIndexOf('/')
                const latest = filePath.substring(n + 1)
                const imageDir = '../public/images/' // change this to your image dir
                const content = fs.readFileSync(filePath)
                const meta = await matter(content)
                main(meta, imageDir, latest)
            }

            if (latestFile) {
                return metaData(latestFile)
            }
        }
    )

    function getLatestFile(array) {
        array.sort((a, b) => b.time.getTime() - a.time.getTime())
        return array[0]
    }

    return null
}

getAllPosts()

/**
 * Post a toot to account.
 *
 * @example
 * const toot = await Twitter.post('This is an update', res.media.media_id_string);
 * // returns success/error object
 *
 * @param  {String} toot  toot string
 * @param  {Twitter} client Client instance of Twitter package
 * @return {Promise<ClientResponse>} Return error or success object
 */
const post = (toot, dir, postPath) => {
    console.log('toot', toot, dir, postPath)

    const limit = 277

    let post

    // if our post is a blurb, the post content is the content
    if (toot.data.blurb && toot.data.blurb === true) {
        post = toot.content
    } else {
        post =
            'New post: ' +
            toot.data.title +
            ' https://randoneering.tech/blog/' +
            postPath.replace('.md', '')
    }

    const tootImageAltText = toot.data.postImageAlt
        ? toot.data.postImageAlt
        : toot.data.title

    // ensure toot is correct length, but if not let's truncate
    // and still post.
    const tootSubstr =
        post.length > limit ? `${post.substring(0, limit - 3)}...` : post

    const data = {
        status: tootSubstr,
    }

    // post a toot with media
    let imagePath
    let b64content

    if (toot.data.blurb && toot.data.blurb === true) {
        imagePath = dir + 'randoneering_logo_120by100.jpeg'
    } else {
        imagePath = postPath.replace('.md', '.jpeg')
        b64content = fs.readFileSync(resolve(join(dir + imagePath)), {
            encoding: 'base64',
        })
    }

    // if our post is a blurb, just send without image
    if (toot.data.blurb && toot.data.blurb === true) {
        return client.post(
            'statuses',
            { status: post },
            function (err, data, response) {
                console.log('toot blurb data', data)
            }
        )
    } else {
        // use the client to post the message with image
        return client.post(
            'media',
            { file: fs.createReadStream(dir + imagePath) },
            function (err, data, response) {
                // now we can assign alt text to the media, for use by screen readers and
                // other text-based presentations and interpreters
                console.log('toot data', data)
                // console.log('toot response', response)
                const mediaIdStr = data.id
                const altText = tootImageAltText
                const meta_params = {
                    media_id: mediaIdStr,
                    alt_text: { text: altText },
                }

                const params = {
                    status: post,
                    media_ids: [mediaIdStr],
                }

                client.post('statuses', params, function (err, data, response) {
                    console.log('toot post data', data)
                })


            }
        )
    }
}

const main = async (toot, dir, postPath) => {
    try {
        console.log('Attempting to post')
        await post(toot, dir, postPath)
        console.log('Posted!')
    } catch (err) {
        console.error(err)
    }
}