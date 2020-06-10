import React, { useState, useEffect } from 'react'
import Axios from 'axios';

export const Project = props => {
  const [project, setProject] = useState(props.data);
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);

  // = ComponentDidMount
  useEffect(() => {
    const getImageUrl = Axios.get(`${process.env.REACT_APP_API}/media/${project.featured_media}`);
    const getAuthor = Axios.get(`${process.env.REACT_APP_API}/users/${project.author}`);

    Promise.all([getImageUrl, getAuthor])
      .then(res => {
        setData({
          imgURL: res[0].data.media_details.sizes.full.source_url,
          authorName: res[1].data.name
        })
        setLoaded(true);
      })
  }, []);

  return (
    <div>
      {loaded &&
        <>
          <h2>{project.title.rendered}</h2>
          <div>
            <img src={data.imgURL} alt={data.authorName} />
            <p>{data.authorName}</p>
          </div>
        </>
      }
    </div>
  )
}
export default Project