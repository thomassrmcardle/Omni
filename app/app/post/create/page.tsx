"use client";

import { useState } from "react"

type Section = {
    id: number
    type: 'text' | 'quote'
    content: string
}


function SectionStack([sections, updateSection, removeSection] : any) {
    return <div>{sections.map((section: any) => (
        <div key={section.id} className="flex items-start mt-4">
            <select
                value={section.type}
                onChange={e => updateSection(section.id, "type", e.target.value)}
            >
                <option value="text">Text</option>
                <option value="Quote">Quote</option>
            </select>

            <textarea
                value={section.content}
                onChange={e => updateSection(section.id, "content", e.target.value)}
            />

            <button
                onClick={() => removeSection(section.id)}
            >Delete</button>
        </div>
    ))}</div>
}


export default function ArticleEditor() {


    var [headline, SetHeadline] = useState("New Article")

    var [sections, setSections] = useState<Section[]>([])

    const addSection = () => {
        setSections(prev => [
            ...prev,
            {id: Date.now(), type: 'text', content: '' },
        ])
    }

    const updateSection = (id : number, field : keyof Section, value: string) => {
        setSections(prev =>
            prev.map(section => 
                section.id === id ? {...section, [field]: value} : section
            )
        )
    }

    const removeSection = (id: number) => {
        setSections(prev => prev.filter(section => section.id != id))
    }

    function ArticleEditor() {

        // Features to add:
        // Text inputs to edit sections
        // Add button to append sections
        // Section type selector
        // Delete button to remove sections

        return <div>
            <SectionStack sections={sections} updateSection={updateSection} removeSection={removeSection} />
            <button className="w-full" onClick={addSection}>
                Add Section
            </button>
        </div>
    }

    return <div className="bg-white dark:bg-black py-32 px-16 w-full flex flex-col items-center">
        <div className="card w-full max-w-2xl flex flex-col">
            <input name="article_headline" placeholder="Headline" value={headline} onChange={e => SetHeadline(e.target.value)} />
            <input name="article_subheadline" placeholder="Subheadline" />
        </div>
        <ArticleEditor />
    </div>
}