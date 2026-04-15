"use client";

import { useState } from "react"

type Section = {
    id: number
    type: 'text' | 'quote'
    content: string
}


function SectionStack({ sections_list, updateSection, removeSection } : any) {
    return <div className="w-full flex flex-col items-center">
        {sections_list.map((section: any) => (
            <div key={section.id} className="flex gap-4 w-full flex justify-center items-start mt-4">
                <select
                    value={section.type}
                    onChange={e => updateSection(section.id, "type", e.target.value)}
                >
                    <option value="text">Text</option>
                    <option value="quote">Quote</option>
                </select>

                <textarea className="w-full max-w-lg"
                    value={section.content}
                    onChange={e => updateSection(section.id, "content", e.target.value)}
                />

                <button
                    onClick={() => removeSection(section.id)}
                >Delete</button>
            </div>
        ))}
    </div>
}


export default function ArticleEditor() {


    var [headline, SetHeadline] = useState("New Article")

    var [sections, setSections] = useState<Section[]>([
        {id: Date.now(), type: 'text', content: ''} // Empty section to help get started
    ])

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

    return <div className="bg-white dark:bg-black py-32 px-16 w-full flex flex-col items-center">
        <div className="card w-full max-w-2xl flex flex-col p-4">
            <input name="article_headline" placeholder="Headline" value={headline} onChange={e => SetHeadline(e.target.value)} />
            <input name="article_subheadline" placeholder="Subheadline" />
        </div>
        <div className="flex flex-col items-center w-full">
            <SectionStack sections_list={sections} updateSection={updateSection} removeSection={removeSection} />
            <button className="w-full max-w-lg" onClick={addSection}>
                Add Section
            </button>
        </div>
    </div>
}