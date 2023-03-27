import React from 'react'
import SongArtist from './SongArtist'
import SongLyric from './SongLyric'
import Message from './Message'

const SongDetails = ({ search, lyric, bio }) => {
    if (!lyric || !bio) return null
    console.log(bio.artists)
    return (
        <>
            {lyric.error || lyric.err || lyric.name === "AbortError"
                ? <Message className='parrafo'msg={`Error: no existe la canción: <em>${search.song}
                <p ${{className:'parrafo'}}>
                Look at the stars
                Look how they shine for you
                And everything you do
                Yeah, they were all yellow
                I came along
                I wrote a song for you
                And all the things you do
                And it was called Yellow
                So then I took my turn
                Oh, what a thing to have done
                And it was all yellow
                Your skin, oh yeah, your skin and bones
                Turn into something beautiful
                And you know, you know I love you so
                You know I love you so
                I swam across
                I jumped across for you
                Oh, what a thing to do
                'Cause you were all yellow
                I drew a line
                I drew a line for you
                Oh, what a thing to do
                And it was all yellow
                And your skin, oh yeah, your skin and bones
                Turn into something beautiful
                And you know, for you, I'd bleed myself dry
                For you, I'd bleed myself dry
                It's true
                Look how they shine for you
                Look how they shine for you
                Look how they shine for
                Look how they shine for you
                Look how they shine for you
                Look how they shine
                Look at the stars
                Look how they shine for you
                And all the things that you do<p/></em>`} bgColor="#dc3545" />
                : <SongLyric title={search.song} lyrics={lyric.lyrics} />
            }
            {bio.artists
                ? <SongArtist artist={bio.artists[0]} />
                : <Message msg={`Error: no existe el artista: ${search.artist}`} bgColor="#dc3545" />
            }
        </>
    )
}

export default SongDetails