import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";
import PageTitle from "../partials/PageTitle";

function Products() {
    PageTitle("Products | Webler");
    return (
        <>
            {/* Header */}
            <MenuNavBar />

            {/* Main */}
            <main>
                <h1>Products</h1>
                <hr />
                <p>These are our published apps and games available exclusively for you. Our games will bring you joy. Our apps will solve the world's biggest problems.</p>

                {/* Responsive grid below, rowHome */}
                <div className="rowHome">
                    <div className="col-6">
                        <h1>Grotto Escape</h1>
                        <p>Product: Game</p>
                        <p>Author: David Dolejsi</p>
                        <p>Genre: Action, Run</p>
                    </div>
                    <div className="col-6">
                        <h1>Chicken Shooter</h1>
                        <p>Product: Game</p>
                        <p>Author: Tejas Shreemali</p>
                        <p>Genre: Shooter, Action</p>
                    </div>
                    <div className="col-6">
                        <h1>Rocket 69</h1>
                        <p>Product: Game</p>
                        <p>Author: David Dolejsi</p>
                        <p>Genre: Fly, Flappy, Rocket, Space</p>
                    </div>
                    <div className="col-6">
                        <h1>Promote my SL Code</h1>
                        <p>Product: App</p>
                        <p>Author: S.I.A</p>
                        <p>Genre: Sololearn Intelligence Agency</p>
                    </div>
                    <div className="col-6">
                        <h1>C' ynth</h1>
                        <p>Product: App</p>
                        <p>Author: ChillPill</p>
                        <p>Genre: C-sound, C, Synth, Music</p>
                    </div>
                    <div className="col-6">
                        <h1>Turtle Game</h1>
                        <p>Product: Game</p>
                        <p>Author: Cosmin Turtureanu</p>
                        <p>Genre: Life, Reality, Ant</p>
                    </div>
                    <div className="col-6">
                        <h1>WeblerOverflow</h1>
                        <p>Product: App</p>
                        <p>Author: Webler</p>
                        <p>Genre: Q&A Discussion, Forum</p>
                    </div>
                    <div className="col-6">
                        <h1>Weblerlearn</h1>
                        <p>Product: App</p>
                        <p>Author: Webler</p>
                        <p>Genre: Learning Platform, Courses, Lessons</p>
                    </div>
                    <div className="col-6">
                        <h1>WeblerHub</h1>
                        <p>Product: App</p>
                        <p>Author: Webler</p>
                        <p>Genre: Social network, chat, media</p>
                    </div>
                    <div className="col-6">
                        <h1>Merch</h1>
                        <p>Product: Goods & Services</p>
                        <p>Distributor: Webler</p>
                        <p>Genre: Merchandise</p>
                    </div>
                </div>

            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}

export default Products;
