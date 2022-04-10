import React, { useEffect, useState } from 'react'
import AppBar from '../components/AppBar';
import Story from '../components/Story';
import parser from '../utils/parser';

export default function HomePage() {
  const [nlu, setNlu] = useState("");

  return (
    <main className="">
      <div className="container mx-auto h-full">
        <textarea
          value={nlu}
          onChange={(e) => setNlu(e.target.value)}
        ></textarea>

        <Story />
      </div>
    </main>
  )
}
