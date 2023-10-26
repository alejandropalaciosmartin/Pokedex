# Pokédex Web Application

This repository hosts a web-based Pokédex, developed using HTML, CSS, and JavaScript, as part of a practical exercise during my studies. I collaborated on this project with my colleague Adrian (check out his GitHub [here](https://github.com/AdrianLozanoMartinez)). The project was inspired by the following assignment:

## Practical Pokédex Assignment
In this practice, we aimed to develop and deploy a web page resembling a Pokédex. The web page displays a list of various Pokémon and their details, specifically focusing on the first generation of Pokémon (the first 151 Pokémon). To complete this task, HTML, CSS, and JavaScript were utilized.

The web page features two views:
1. List of Pokémon
2. Detailed Pokémon Information

### List of Pokémon
This is the initial view when the web page is opened. It includes:
- A header with the text "Pokédex" with a custom font (available [here](https://www.dafont.com/es/pokemon.font)).
- A list of all Pokémon in the Pokédex, with at least 2 Pokémon per row.
- Information for each Pokémon, including:
  - A picture: front image of the Pokémon.
  - Name: Pokémon name with proper capitalization.
  - Pokédex number: formatted as #000, e.g., #023.
  - Type or types: displayed in rounded boxes with background color associated with the type. The type name is in Spanish and white text with black outline.

Additionally, there is a search functionality that allows users to search for Pokémon by name. The list is dynamically updated as users type, ignoring case sensitivity.

Clicking on a Pokémon in the list will lead to the next view, displaying detailed information.

### Detailed Pokémon Information
This view appears when a Pokémon is selected from the previous view. It includes:
- Front image of the Pokémon.
- Pokémon name.
- Pokédex number.
- Type or types (formatted as in the previous view).
- Weight in kilograms.
- Height in meters.
- Base statistics, showing numeric values and bar representation for:
  - HP (Health Points)
  - Attack
  - Defense
  - Special Attack
  - Special Defense
  - Speed
- Evolution chain: Displaying the entire evolutionary chain, including evolutions and pre-evolutions of first-generation Pokémon, with information on the evolution trigger. Clicking on an evolution leads to the detailed information view for that Pokémon.

### Other Features
Both views include the option to switch between light and dark modes. This preference is stored locally to maintain the selected mode when switching views.

The application is entirely in Spanish.

## Deployment
To deploy the application on GitHub, please refer to the instructions in this [video](https://www.youtube.com/watch?v=c5YVvdZ0-a0&ab_channel=SomosDevs).

## Deliverables
The repository contains the complete source code and necessary files for local execution, along with a link to the publicly deployed version. The names of the students who worked on the project are also provided.
