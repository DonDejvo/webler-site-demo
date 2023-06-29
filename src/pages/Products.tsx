import Button from 'react-bootstrap/Button';
import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";
import PageTitle from "../partials/PageTitle";

function Products() {
    PageTitle("Products | Webler");
    return (
        <>
            {/* Header */}
            <MenuNavBar pageName={"Products"} />

            {/* Main */}
            <main>
                <h1>Products</h1>
                <hr />
                <p>These are our published apps and games available exclusively for you. Our games will bring you joy. Our apps will solve the world's biggest problems.</p>

                {/* Responsive grid below, rowHome */}
                <div className="rowHome">
                    <div className="col-7">
                        <h1>Grotto Escape</h1>
                        <p>Product: Game</p>
                        <p>Developer: David Dolejsi</p>
                        <p>Genre: Action, Run</p>
                        <hr></hr>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, "to add a short description of this product here" sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                        <Button variant="primary">Play game</Button><span style={{float:"right", fontSize:"12px"}}> 96 likes - 69 comments - 403 views</span>
                    </div>
                    <div className="col-7">
                        <h1>Chicken Shooter</h1>
                        <p>Product: Game</p>
                        <p>Developer: Tejas Shrimali</p>
                        <p>Genre: Shooter, Action</p>
                        <hr></hr>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, "to add a short description of this product here" sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                        <Button variant="primary">Play game</Button><span style={{float:"right", fontSize:"12px"}}> 96 likes - 69 comments - 403 views</span>
                    </div>
                    <div className="col-7">
                        <h1>Rocket 69</h1>
                        <p>Product: Game</p>
                        <p>Developer: David Dolejsi</p>
                        <p>Genre: Fly, Flappy, Rocket, Space</p>
                        <hr></hr>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, "to add a short description of this product here" sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                        <Button variant="primary">Play game</Button><span style={{float:"right", fontSize:"12px"}}> 96 likes - 69 comments - 403 views</span>
                    </div>
                    <div className="col-7">
                        <h1>Promote my SL Code</h1>
                        <p>Product: App</p>
                        <p>Developer: S.I.A</p>
                        <p>Genre: Sololearn Intelligence Agency, Tools, Hack, Boost</p>
                        <hr></hr>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, "to add a short description of this product here" sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                        <Button variant="primary">Use this app</Button><span style={{float:"right", fontSize:"12px"}}> 96 likes - 69 comments - 403 views</span>
                    </div>
                    <div className="col-7">
                        <h1>C' ynth</h1>
                        <p>Product: App</p>
                        <p>Developer: ChillPill</p>
                        <p>Genre: C-sound, C, Synth, Music</p>
                        <hr></hr>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, "to add a short description of this product here" sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                        <Button variant="primary">Use this app</Button><span style={{float:"right", fontSize:"12px"}}> 96 likes - 69 comments - 403 views</span>
                    </div>
                    <div className="col-7">
                        <h1>Life Game</h1>
                        <p>Product: Game</p>
                        <p>Developer: Cosmin Turtureanu</p>
                        <p>Genre: Life, Reality, Ant, Decisions, Choices</p>
                        <hr></hr>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, "to add a short description of this product here" sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                        <Button variant="primary">Play game</Button><span style={{float:"right", fontSize:"12px"}}> 96 likes - 69 comments - 403 views</span>
                    </div>
                    <div className="col-7">
                        <h1>WeblerOverflow</h1>
                        <p>Product: App</p>
                        <p>Developer: Webler</p>
                        <p>Genre: Q&A Discussion, Forum</p>
                        <hr></hr>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, "to add a short description of this product here" sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                        <Button variant="primary">Join Community</Button><span style={{float:"right", fontSize:"12px"}}> 96 likes - 69 comments - 403 views</span>
                    </div>
                    <div className="col-7">
                        <h1>Weblerlearn</h1>
                        <p>Product: App</p>
                        <p>Developer: Webler</p>
                        <p>Genre: Learning Platform, Courses, Lessons</p>
                        <hr></hr>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, "to add a short description of this product here" sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                        <Button variant="primary">Enroll to our courses</Button><span style={{float:"right", fontSize:"12px"}}> 96 likes - 69 comments - 403 views</span>
                    </div>
                    <div className="col-7">
                        <h1>WeblerHub</h1>
                        <p>Product: App</p>
                        <p>Developer: Webler</p>
                        <p>Genre: Social network, Chat, Media</p>
                        <hr></hr>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, "to add a short description of this product here" sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                        <Button variant="primary">Meet and Chat</Button><span style={{float:"right", fontSize:"12px"}}> 96 likes - 69 comments - 403 views</span>
                    </div>
                    <div className="col-7">
                        <h1>Merch</h1>
                        <p>Product: Goods & Services</p>
                        <p>Distributor: Webler</p>
                        <p>Genre: Merchandise</p>
                        <hr></hr>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, "to add a short description of this product here" sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                        <Button variant="primary">Buy our merch</Button><span style={{float:"right", fontSize:"12px"}}> 96 likes - 69 comments - 403 views</span>
                    </div>
                </div>

            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}

export default Products;