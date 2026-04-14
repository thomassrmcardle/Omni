"use client";

import { useState } from "react"

export default function ArticleEditor() {

    var [sections, setSections] = useState<string[]>([])

    const addSection = () => {
        setSections(prev => [...prev, 'Test Section'])
    }

    function ArticleEditor() {

        // Features to add:
        // Text inputs to edit sections
        // Add button to append sections
        // Section type selector
        // Delete button to remove sections

        return <div>
            {sections.map((section : any) => (<div>
                <p>{section}</p>
            </div>))}
            <button className="w-full" onClick={addSection}>
                Add Section
            </button>
        </div>
    }

    return <div className="bg-white dark:bg-black py-32 px-16 w-full">
        <div className="card">
            <input name="article_headline" placeholder="Headline" value={"New Article"} />
            <input name="article_subheadline" placeholder="Subheadline" />
        </div>
        <ArticleEditor />
    </div>
}