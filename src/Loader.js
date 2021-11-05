const Loader = ({isDisplay}) => {
    return (
        <>
            {
                isDisplay ? <>
                    <div className={"loader-background"}>
                        <div className={"loader"}>
                        </div>
                    </div>
                </> : null
            }

        </>
    )
}

export default Loader