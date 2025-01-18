import os
import json
from typing import Dict, List, Set
import re
from datetime import datetime

class CodeAnalyzer:
    def __init__(self, repo_path: str):
        self.repo_path = repo_path
        self.excluded_dirs = {'node_modules', 'dist', 'build', '.git', '__pycache__'}
        self.file_extensions = {'.ts', '.tsx', '.js', '.jsx', '.css'}
        self.structure = {
            'backend': {},
            'frontend': {},
            'metadata': {
                'analysis_date': datetime.now().isoformat(),
                'total_files': 0,
                'file_types': {}
            }
        }
        
    def analyze_typescript_content(self, content: str) -> Dict:
        """Analyze TypeScript/JavaScript file content"""
        analysis = {
            'imports': [],
            'exports': [],
            'classes': [],
            'interfaces': [],
            'functions': []
        }
        
        # Basic regex patterns
        import_pattern = r'import\s+.*?from\s+[\'"](.+?)[\'"]'
        export_pattern = r'export\s+(?:default\s+)?(?:class|interface|const|function)?\s+(\w+)'
        class_pattern = r'class\s+(\w+)'
        interface_pattern = r'interface\s+(\w+)'
        function_pattern = r'function\s+(\w+)'
        
        # Extract information using regex
        analysis['imports'] = re.findall(import_pattern, content)
        analysis['exports'] = re.findall(export_pattern, content)
        analysis['classes'] = re.findall(class_pattern, content)
        analysis['interfaces'] = re.findall(interface_pattern, content)
        analysis['functions'] = re.findall(function_pattern, content)
        
        return analysis
    
    def analyze_css_content(self, content: str) -> Dict:
        """Analyze CSS file content"""
        analysis = {
            'classes': [],
            'ids': []
        }
        
        # Basic regex patterns for CSS
        class_pattern = r'\.([a-zA-Z][\w-]*)'
        id_pattern = r'#([a-zA-Z][\w-]*)'
        
        analysis['classes'] = list(set(re.findall(class_pattern, content)))
        analysis['ids'] = list(set(re.findall(id_pattern, content)))
        
        return analysis
    
    def analyze_file(self, file_path: str) -> Dict:
        """Analyze a single file based on its extension"""
        _, ext = os.path.splitext(file_path)
        
        if ext not in self.file_extensions:
            return None
            
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if ext in ['.ts', '.tsx', '.js', '.jsx']:
            return self.analyze_typescript_content(content)
        elif ext == '.css':
            return self.analyze_css_content(content)
            
        return None
    
    def analyze_directory(self, directory: str) -> Dict:
        """Analyze a directory and its subdirectories"""
        structure = {}
        
        for root, dirs, files in os.walk(directory):
            # Skip excluded directories
            dirs[:] = [d for d in dirs if d not in self.excluded_dirs]
            
            current_dir = {}
            for file in files:
                file_path = os.path.join(root, file)
                _, ext = os.path.splitext(file)
                
                if ext in self.file_extensions:
                    self.structure['metadata']['total_files'] += 1
                    self.structure['metadata']['file_types'][ext] = self.structure['metadata']['file_types'].get(ext, 0) + 1
                    
                    try:
                        analysis = self.analyze_file(file_path)
                        if analysis:
                            current_dir[file] = analysis
                    except Exception as e:
                        current_dir[file] = f"Error analyzing file: {str(e)}"
            
            if current_dir:
                rel_path = os.path.relpath(root, directory)
                structure[rel_path] = current_dir
                
        return structure
    
    def analyze(self) -> Dict:
        """Main analysis method"""
        # Analyze backend
        backend_path = os.path.join(self.repo_path, 'backend')
        if os.path.exists(backend_path):
            self.structure['backend'] = self.analyze_directory(backend_path)
            
        # Analyze frontend
        frontend_path = os.path.join(self.repo_path, 'frontend')
        if os.path.exists(frontend_path):
            self.structure['frontend'] = self.analyze_directory(frontend_path)
            
        return self.structure
    
    def generate_report(self) -> str:
        """Generate a human-readable report"""
        report = []
        report.append("# Microservices Analysis Report")
        report.append(f"\nAnalysis Date: {self.structure['metadata']['analysis_date']}")
        report.append(f"\nTotal Files Analyzed: {self.structure['metadata']['total_files']}")
        
        report.append("\n## File Types Distribution:")
        for ext, count in self.structure['metadata']['file_types'].items():
            report.append(f"- {ext}: {count} files")
        
        for service in ['backend', 'frontend']:
            report.append(f"\n## {service.title()} Service")
            
            if not self.structure[service]:
                report.append(f"No {service} directory found or it's empty.")
                continue
                
            for dir_path, files in self.structure[service].items():
                report.append(f"\n### Directory: {dir_path}")
                
                for file_name, analysis in files.items():
                    report.append(f"\n#### {file_name}")
                    
                    if isinstance(analysis, str):  # Error message
                        report.append(analysis)
                        continue
                        
                    for key, values in analysis.items():
                        if values:
                            report.append(f"\n- {key.title()}:")
                            for value in values:
                                report.append(f"  - {value}")
        
        return "\n".join(report)

def main():
    # Initialize analyzer
    analyzer = CodeAnalyzer("register")
    
    # Perform analysis
    structure = analyzer.analyze()
    
    # Save detailed JSON structure
    with open('microservices_analysis.json', 'w', encoding='utf-8') as f:
        json.dump(structure, f, indent=2)
    
    # Generate and save human-readable report
    report = analyzer.generate_report()
    with open('microservices_report.md', 'w', encoding='utf-8') as f:
        f.write(report)
    
    print("Analysis complete! Check 'microservices_analysis.json' for detailed structure")
    print("and 'microservices_report.md' for human-readable report.")

if __name__ == "__main__":
    main()

# Created/Modified files during execution:
print("Generated files:")
for file_name in ["microservices_analysis.json", "microservices_report.md"]:
    print(f"- {file_name}")