const atomicMasses =
{
    "H": 1.008,
    "He": 4.0026022,
    "Li": 6.94,
    "Be": 9.01218315,
    "B": 10.81,
    "C": 12.011,
    "N": 14.007,
    "O": 15.999,
    "F": 18.99840316,
    "Ne": 20.17976,
    "Na": 22.98976928,
    "Mg": 24.305,
    "Al": 26.98153857,
    "Si": 28.085,
    "P": 30.973762,
    "S": 32.06,
    "Cl": 35.45,
    "Ar": 39.9481,
    "K": 39.0983,
    "Ca": 40.078,
    "Sc": 44.955908,
    "Ti": 47.867,
    "V": 50.9415,
    "Cr": 51.9961,
    "Mn": 54.938044,
    "Fe": 55.845,
    "Co": 58.933194,
    "Ni": 58.6934,
    "Cu": 63.546,
    "Zn": 65.38,
    "Ga": 69.723,
    "Ge": 72.63,
    "As": 74.921595,
    "Se": 78.971,
    "Br": 79.904,
    "Kr": 83.798,
    "Rb": 85.4678,
    "Sr": 87.62,
    "Y": 88.90584,
    "Zr": 91.224,
    "Nb": 92.90637,
    "Mo": 95.95,
    "Tc": 98,
    "Ru": 101.07,
    "Rh": 102.9055,
    "Pd": 106.42,
    "Ag": 107.8682,
    "Cd": 112.414,
    "In": 114.818,
    "Sn": 118.71,
    "Sb": 121.76,
    "Te": 127.6,
    "I": 126.90447,
    "Xe": 131.293,
    "Cs": 132.90545196,
    "Ba": 137.327,
    "La": 138.90547,
    "Ce": 140.116,
    "Pr": 140.90766,
    "Nd": 144.242,
    "Pm": 145,
    "Sm": 150.36,
    "Eu": 151.964,
    "Gd": 157.25,
    "Tb": 158.92535,
    "Dy": 162.5,
    "Ho": 164.93033,
    "Er": 167.259,
    "Tm": 168.93422,
    "Yb": 173.045,
    "Lu": 174.9668,
    "Hf": 178.49,
    "Ta": 180.94788,
    "W": 183.84,
    "Re": 186.207,
    "Os": 190.23,
    "Ir": 192.217,
    "Pt": 195.084,
    "Au": 196.966569,
    "Hg": 200.592,
    "Tl": 204.38,
    "Pb": 207.2,
    "Bi": 208.9804,
    "Po": 209,
    "At": 210,
    "Rn": 222,
    "Fr": 223,
    "Ra": 226,
    "Ac": 227,
    "Th": 232.0377,
    "Pa": 231.03588,
    "U": 238.02891,
    "Np": 237,
    "Pu": 244,
    "Am": 243,
    "Cm": 247,
    "Bk": 247,
    "Cf": 251,
    "Es": 252,
    "Fm": 257,
    "Md": 258,
    "No": 259,
    "Lr": 266,
    "Rf": 267,
    "Db": 268,
    "Sg": 269,
    "Bh": 270,
    "Hs": 269,
    "Mt": 278,
    "Ds": 281,
    "Rg": 282,
    "Cn": 285,
    "Nh": 286,
    "Fl": 289,
    "Mc": 289,
    "Lv": 293,
    "Ts": 294,
    "Og": 294,
    "Uue": 315
};

var useSigFigs = false;
var lowercase = false;
$(function()
{
    $('#form').on('submit', function(e)
    {
        e.preventDefault();
        if (useSigFigs)
        {
            calculateGramFormulaMassSigFigs(document.getElementById("input").value, parseInt(document.getElementById('sigfigsnum').value, 10))
        }
        else
        {
            document.getElementById("gfm").textContent = `GFM: ${calculateGramFormulaMass(document.getElementById("input").value)}`;
        }
    });
});

function parseChemicalCompound(compound)
{
    let elementRegex;
    if (lowercase)
    {
        elementRegex = /([A-Za-z]+)(\d*)/g;
    }
    else
    {
        elementRegex = /([A-Z][a-z]*)(\d*)/g;
    }
    const coefficientRegex = /^(\d+)/;
    let match, coefficientMatch;
    let elements = {};
    coefficientMatch = compound.match(coefficientRegex);
    let coefficient = coefficientMatch ? parseInt(coefficientMatch[0], 10) : 1;
    compound = compound.replace(coefficientRegex, '');
    while ((match = elementRegex.exec(compound)) !== null)
    {
        const element = match[1];
        let count = parseInt(match[2], 10) || 1;
        count *= coefficient;
        const normalizedElement = lowercase ? element.toUpperCase() : element;
        if (elements[normalizedElement])
        {
            elements[normalizedElement] += count;
        }
        else
        {
            elements[normalizedElement] = count;
        }
    }
    return elements;
}

function calculateGramFormulaMass(compound)
{
    if (/[A-Z]/.test(compound) && lowercase || (!/[A-Z]/.test(compound) && !lowercase)) //check if all lowercase
    {
        return "error";
    }
    const elements = parseChemicalCompound(compound);
    let mass = 0;
    for (const element in elements)
    {
        if (atomicMasses[element])
        {
            mass += atomicMasses[element] * elements[element];
        }
        else
        {
            return null;
        }
    }
    return mass;
}

function calculateGramFormulaMassSigFigs(compound, sigfigs)
{
    if (/[A-Z]/.test(compound) && lowercase || (!/[A-Z]/.test(compound) && !lowercase)) //check if all lowercase
    {
        document.getElementById("gfm").textContent = `GFM: error`;
        return;
    }
    const elements = parseChemicalCompound(compound);
    let mass = 0;
    for (const element in elements)
    {
        if (atomicMasses[element])
        {
            mass += atomicMasses[element] * elements[element];
        }
        else
        {
            return null;
        }
    }
    document.getElementById("gfm").textContent = `GFM: ${mass.toPrecision(sigfigs)}`;
}