import Navbars from "./Navbars";
import Top from "./Top";

const Error = () => {

    const ErrorPage = () => {
        return (
            <>
              <div className={"container"}>
                  <div className={"card"} style={{marginTop:"100px",padding:"100px"}}>
                      <div className={"card-body"}>
                          <div className={"row"}>
                              <div className={"col-md-4"}>
                                  <img height={"200px"}  src={`${process.env.PUBLIC_URL}/img/pagenotfound.png`}/>
                              </div>
                              <div className={"col-md-8"}>
                                   <h1 className={"text-center"}> PAGE NOT FOUND </h1>
                                  <p className={"text-center"}> The page you are looking for is not available that moment , <a href={"/applicant/dashboard"}> Go To Home.</a> </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </>
        )
    }

    return (
        <>
            <Top/>
            <Navbars/>
            <ErrorPage/>
        </>
    )
}

export default Error