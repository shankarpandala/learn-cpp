import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import WarningBlock from '../../../components/content/WarningBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S3FileIO() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Programs often need to read data from files or write results to files for persistent
        storage. C++ provides file stream classes in the <code>&lt;fstream&gt;</code> header
        that work just like <code>std::cin</code> and <code>std::cout</code>, making file I/O
        feel familiar and consistent.
      </p>

      <DefinitionBlock title="File Stream Classes">
        <p>
          C++ provides three file stream classes: <code>std::ifstream</code> for reading from
          files (input), <code>std::ofstream</code> for writing to files (output),
          and <code>std::fstream</code> for both reading and writing. All are defined in
          the <code>&lt;fstream&gt;</code> header.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Writing to a File</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Use <code>std::ofstream</code> to create and write to files. The insertion
        operator (<code>&lt;&lt;</code>) works exactly as it does with <code>std::cout</code>.
        By default, opening a file for output creates it if it does not exist, or truncates it
        if it does.
      </p>

      <CppCode title="write_file.cpp">{`#include <iostream>
#include <fstream>
#include <string>

int main() {
    std::ofstream outFile("output.txt");

    if (!outFile.is_open()) {
        std::cerr << "Error: could not create file!" << std::endl;
        return 1;
    }

    outFile << "Name: Alice" << std::endl;
    outFile << "Age: 30" << std::endl;
    outFile << "Score: 95.5" << std::endl;

    outFile.close();
    std::cout << "Data written to output.txt" << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`Data written to output.txt`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Reading from a File</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Use <code>std::ifstream</code> to read from files. You can read word by word
        with <code>&gt;&gt;</code> or line by line with <code>std::getline()</code>.
      </p>

      <CppCode title="read_file.cpp">{`#include <iostream>
#include <fstream>
#include <string>

int main() {
    std::ifstream inFile("output.txt");

    if (!inFile.is_open()) {
        std::cerr << "Error: could not open file!" << std::endl;
        return 1;
    }

    // Read line by line
    std::string line;
    int lineNumber = 1;
    while (std::getline(inFile, line)) {
        std::cout << lineNumber << ": " << line << std::endl;
        ++lineNumber;
    }

    inFile.close();
    return 0;
}`}</CppCode>

      <OutputBlock>{`1: Name: Alice
2: Age: 30
3: Score: 95.5`}</OutputBlock>

      <BestPracticeBlock title="Always Check if the File Opened">
        <p>
          Always verify that a file stream opened successfully using <code>is_open()</code> or
          by testing the stream in a boolean context. A file might fail to open because it does
          not exist, permissions are insufficient, or the path is invalid. Proceeding without
          checking leads to silent data loss.
        </p>
      </BestPracticeBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">File Open Modes</h2>

      <SyntaxBlock title="File Modes">
        <p>
          You can control how a file is opened by passing mode flags to the constructor or
          the <code>open()</code> method. Multiple modes can be combined with the
          bitwise OR operator (<code>|</code>).
        </p>
        <CppCode>{`std::ios::in      // Open for reading (default for ifstream)
std::ios::out     // Open for writing (default for ofstream)
std::ios::app     // Append to end of file
std::ios::trunc   // Truncate file to zero length (default with out)
std::ios::ate     // Seek to end after opening
std::ios::binary  // Open in binary mode`}</CppCode>
      </SyntaxBlock>

      <CppCode title="append_mode.cpp">{`#include <iostream>
#include <fstream>

int main() {
    // Append to existing file instead of overwriting
    std::ofstream outFile("log.txt", std::ios::app);

    if (!outFile.is_open()) {
        std::cerr << "Error opening log file!" << std::endl;
        return 1;
    }

    outFile << "New log entry: program started" << std::endl;
    outFile.close();

    // Read and display the full file
    std::ifstream inFile("log.txt");
    std::string line;
    while (std::getline(inFile, line)) {
        std::cout << line << std::endl;
    }
    inFile.close();

    return 0;
}`}</CppCode>

      <NoteBlock type="important" title="RAII and File Streams">
        <p>
          File streams automatically close when they go out of scope thanks to their destructor.
          Calling <code>.close()</code> explicitly is not strictly necessary, but it is good
          practice when you want to ensure data is flushed before proceeding, or when you want
          to reuse the stream object for another file.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Reading Structured Data</h2>

      <CppCode title="structured_read.cpp">{`#include <iostream>
#include <fstream>
#include <string>

int main() {
    // First, create a CSV-like file
    std::ofstream out("students.txt");
    out << "Alice 90 85 92" << std::endl;
    out << "Bob 78 88 76" << std::endl;
    out << "Carol 95 91 89" << std::endl;
    out.close();

    // Now read and process it
    std::ifstream in("students.txt");
    if (!in.is_open()) {
        std::cerr << "Cannot open students.txt" << std::endl;
        return 1;
    }

    std::string name;
    int score1, score2, score3;

    std::cout << "Student Averages:" << std::endl;
    while (in >> name >> score1 >> score2 >> score3) {
        double average = (score1 + score2 + score3) / 3.0;
        std::cout << name << ": " << average << std::endl;
    }

    in.close();
    return 0;
}`}</CppCode>

      <OutputBlock>{`Student Averages:
Alice: 89
Bob: 80.6667
Carol: 91.6667`}</OutputBlock>

      <WarningBlock title="Error Checking During Reads">
        <p>
          When reading structured data, a malformed file can put the stream into a fail state.
          Always check the stream state after reading. The <code>while (stream &gt;&gt; var)</code>
          idiom naturally handles end-of-file and errors by stopping the loop when a read fails.
        </p>
      </WarningBlock>

      <NoteBlock type="tip" title="Relative vs Absolute Paths">
        <p>
          File paths without a leading <code>/</code> (on Linux/macOS) or drive letter (on Windows)
          are relative to the current working directory — which may not be the directory containing
          your program. When debugging "file not found" errors, print the current directory or use
          absolute paths.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="File Copy Program"
        difficulty="beginner"
        prompt="Write a program that creates a file called 'source.txt' with three lines of text, then reads it and writes its contents to 'copy.txt'. Verify by reading and printing 'copy.txt'."
        hints={[
          "Open an ofstream for source.txt, write lines, then close it",
          "Open an ifstream for source.txt and an ofstream for copy.txt",
          "Use getline in a loop to read from source and write to copy",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <fstream>
#include <string>

int main() {
    // Create source file
    std::ofstream source("source.txt");
    source << "Line one" << std::endl;
    source << "Line two" << std::endl;
    source << "Line three" << std::endl;
    source.close();

    // Copy source to destination
    std::ifstream in("source.txt");
    std::ofstream out("copy.txt");
    std::string line;
    while (std::getline(in, line)) {
        out << line << std::endl;
    }
    in.close();
    out.close();

    // Verify
    std::ifstream verify("copy.txt");
    while (std::getline(verify, line)) {
        std::cout << line << std::endl;
    }
    verify.close();

    return 0;
}`}</CppCode>
        }
      />

      <ExerciseBlock
        title="Word Frequency Counter"
        difficulty="intermediate"
        prompt="Write a program that creates a file with the text 'the cat sat on the mat the cat', reads it word by word, and counts how many times the word 'the' appears."
        hints={[
          "Write the text to a file, then open it for reading",
          "Use >> to read one word at a time in a while loop",
          "Compare each word to 'the' and increment a counter",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <fstream>
#include <string>

int main() {
    // Create the file
    std::ofstream out("words.txt");
    out << "the cat sat on the mat the cat" << std::endl;
    out.close();

    // Count occurrences of "the"
    std::ifstream in("words.txt");
    std::string word;
    int count = 0;

    while (in >> word) {
        if (word == "the") {
            ++count;
        }
    }
    in.close();

    std::cout << "'the' appears " << count << " times" << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::ifstream', url: 'https://en.cppreference.com/w/cpp/io/basic_ifstream', description: 'Input file stream class' },
        { type: 'cppreference', title: 'std::ofstream', url: 'https://en.cppreference.com/w/cpp/io/basic_ofstream', description: 'Output file stream class' },
        { type: 'cppreference', title: 'std::ios::openmode', url: 'https://en.cppreference.com/w/cpp/io/ios_base/openmode', description: 'File open mode flags' },
        { type: 'textbook', title: 'C++ Primer', author: 'Stanley Lippman', description: 'Chapter 8: The IO Library' },
      ]} />
    </div>
  )
}
