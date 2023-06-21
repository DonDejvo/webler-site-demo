import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";
import PageTitle from "../partials/PageTitle";

function Help() {
    PageTitle("Help | Webler")
    return (
        <>
            {/* Header */}
            <MenuNavBar />

            {/* Main */}
            <main>
                <h1>Help Center</h1>
                <hr />
                <p>Feeling stuck? Need urgent assistance? Let us help you right away:</p>

                <br /><br />
                <h2>FAQ's - Frequently Asked Questions</h2>
                <p>Question 1?</p>
                <p>Answer 1</p>
                <p>Question 2?</p>
                <p>Answer 2</p>
                <p>Question 3?</p>
                <p>Answer 3</p>
                <p>Question 4?</p>
                <p>Answer 4</p>
            </main>
                
            {/* Footer */}
            <Footer/>
        </>
    );
}

export default Help;