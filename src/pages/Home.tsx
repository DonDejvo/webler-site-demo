import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";

function Home() {
    return (
        <>
            {/* Header */}
            <MenuNavBar />
            <div className="bannerImage">{/* collage.jpg is set as blurred background image*/}</div>
            <div className="bannerImagePropsFore">
                <img src="/src/resources/images/logo_transparent.png" width="500px"/>
                <p className="bannerText bTbigger">Software Engineering</p>
                <hr></hr>
                <p className="bannerText bTsmaller">- Building the future, one code at a time</p>
            </div>

            {/* Main */}
            <main className="mainAfterBanner">
                <a href="https://github.com/WeblerGroup" target="blank" className="bannerGitHubAdv" ><img className="gitlogo" src="/src/resources/images/github-mark.png" width="33px"/> GitHub | Check out our project source codes</a>
                <h1>Home</h1>
                <h4>Welcome to Webler!</h4>
                <hr></hr>
                <p>Hey! We're Webler, a group of independent developers around the world. We create applications of any kind, but mostly for the web. All our products are meant to be either useful or fun, but most importantly free! Our goal is to make accessible, innovative software, that's our contribution to a better future. We hope that some of our projects might be helpful and enjoyable for you :D Here's an overview of our projects and news:</p>
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}

export default Home;