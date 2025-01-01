
// This page just provides a permament redirect to the
//  default home page as defined in CF

import React, { useEffect,useState } from "react";
import Router from 'next/router'

// TODO: Could get the defaultSlug [which is a slug] from properties in CF
// Note: the defaultHomePage slug determines the default language in [slug]/index.tsx
const defaultSlug = process.env.NEXT_PUBLIC_DEFAULT_SLUG;

// from: https://stackoverflow.com/questions/58173809/next-js-redirect-from-to-another-page
const RootPage = ()=>{
    const [loaded,setLoaded] = useState(false)
    useEffect(() => {
        const {pathname} = Router
        // conditional redirect
        if(pathname == '/' ){
            // with router.push the page may be added to history
            // the browser on history back will go back to this page and then forward again to the redirected page
            // you can prevent this behaviour using location.replace
            // Router.push(defaultSlug)
           location.replace(defaultSlug)
        }else{
            setLoaded(true)
        }
      },[]);

    if(!loaded){
        return <div></div> //show nothing or a loader
    }
    return (
        <p>
            You will see this page only if pathname !== &quot;/&quot; , <br/>
        </p>
    )
}
export default RootPage
