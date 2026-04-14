import { useState } from "react"

export default function ArticleEditor() {

    var [sections, setSections] = useState([])

    function AddSection() {
        var curSections : any = sections
        curSections.push('Test Section')
        setSections(curSections)
    }

    function ArticleEditor() {

        // Features to add:
        // Text inputs to edit sections
        // Add button to append sections
        // Section type selector
        // Delete button to remove sections

        return <div>
            {sections.map((section : any) => (<div>
                <p>section</p>
            </div>))}
            <button className="w-full" onClick={AddSection}>
                Add Section
            </button>
        </div>
    }

    return <div className="bg-white dark:bg-black py-32 px-16 w-full">
        <div className="card">
            <input name="article_headline" placeholder="Headline">New Article</input>
            <input name="article_subheadline" placeholder="Subheadline"></input>
        </div>
        <ArticleEditor />
    </div>
}