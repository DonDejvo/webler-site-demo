import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";

function Home() {
    return (
        <>
            {/* Header */}
            <MenuNavBar pageName={"Home"}/>
            <div className="bannerImage">{/* collage.jpg is set as blurred background image*/}</div>
            <div className="bannerImagePropsFore">
                <img src="../resources/images/logotransparent.png" className="bigLogoFront"/>
                <p className="bannerText bTbigger">Software Engineering</p>
                <hr></hr>
                <p className="bannerText bTsmaller">- Building the future, one code at a time</p>
            </div>

            {/* Main */}
            <main className="mainAfterBanner">
                <a href="https://github.com/WeblerGroup" target="blank" className="bannerGitHubAdv" ><img className="gitlogo" src="../resources/images/githubmark.png" width="33px"/> GitHub | Check out our project source codes</a>
                <h1>Home</h1>
                <h4>Welcome to Webler!</h4>
                <hr></hr>
                <p>Hey! We're Webler, a group of independent developers around the world. We create applications of any kind, but mostly for the web. All our products are meant to be either useful or fun, but most importantly free! Our goal is to make accessible, innovative software, that's our contribution to a better future. We hope that some of our projects might be helpful and enjoyable for you :D Here's an overview of our projects and news:</p>

                <div className="rowHome">
                    <div className="col-6">
                        <h1>Products</h1>
                        <p>The developers of Webler have published a lot of apps and games for everyone to use and play with, absolutely for free.</p>
                    </div>
                    <div className="col-6">
                        <h1>News</h1>
                        <p>Check out the latest news in Webler, and be the first to know about every groundbreaking event in the world of modern computing science.</p>
                    </div>
                    <div className="col-6">
                        <h1>Community</h1>
                        <p>Be part of our programming community, as you share codes, pictures, memes, discuss, and share likes & follows in our social network of coders.</p>
                    </div>
                    <div className="col-6">
                        <h1>Learn</h1>
                        <p>Educate yourself and land your first programming oriented job with our Courses. Enroll now.</p>
                    </div>
                </div>
            </main>
             {/* Footer */}
             <Footer />
        </>
    );
}

export default Home;