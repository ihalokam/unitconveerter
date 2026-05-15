import React from 'react';
import {
    Ruler, Weight, Thermometer, Square, Waves, Wind,
    Clock, Zap, Battery, Gauge, Database, Crosshair,
    Droplets, Globe2, Cpu, BookOpen, Hash, ChevronRight,
    FlaskConical, Lightbulb, Info,
} from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────

interface Equation {
    label: string;
    formula: string;
    example?: string;
}

interface SubTopic {
    title: string;
    body: string;
    equations: Equation[];
    note?: string;
}

interface CategoryContent {
    key: string;
    title: string;
    icon: React.ReactNode;
    color: string;
    tagline: string;
    description: string;
    siUnit: string;
    subtopics: SubTopic[];
    didYouKnow?: string;
}

// ─── Content Data ───────────────────────────────────────────────────────────

const CONTENT: CategoryContent[] = [
    {
        key: 'length',
        title: 'Length & Distance',
        icon: <Ruler size={22} />,
        color: '#3b82f6',
        tagline: 'The fundamental measure of space',
        siUnit: 'Meter (m)',
        description:
            'Length is one of the seven base quantities in the International System of Units (SI). It quantifies the one-dimensional extent of an object or the distance between two points. From subatomic scales measured in femtometers to cosmic distances measured in light-years, length conversion is essential across physics, engineering, navigation, and everyday life. The meter — defined since 2019 as the distance light travels in vacuum in exactly 1/299,792,458 of a second — is the universal base unit.',
        subtopics: [
            {
                title: 'Metric System (SI)',
                body: 'The metric system uses powers of ten, making conversions straightforward multiplication or division. The meter (m) is the base unit, with prefixes like milli- (10⁻³), centi- (10⁻²), and kilo- (10³) applied systematically. This coherence makes the metric system the global standard in science and most countries.',
                equations: [
                    { label: '1 kilometer to meters', formula: '1 km = 1,000 m', example: '5 km = 5,000 m' },
                    { label: '1 meter to centimeters', formula: '1 m = 100 cm', example: '2.5 m = 250 cm' },
                    { label: '1 centimeter to millimeters', formula: '1 cm = 10 mm', example: '7 cm = 70 mm' },
                ],
            },
            {
                title: 'Imperial / US Customary System',
                body: 'The imperial system, used primarily in the United States, still dominates everyday life in construction, road distances, and personal measurements. Conversions within this system are non-decimal and require memorization of specific ratios.',
                equations: [
                    { label: '1 mile to feet', formula: '1 mi = 5,280 ft', example: '3 mi = 15,840 ft' },
                    { label: '1 yard to feet', formula: '1 yd = 3 ft', example: '10 yd = 30 ft' },
                    { label: '1 foot to inches', formula: '1 ft = 12 in', example: '6 ft = 72 in' },
                ],
            },
            {
                title: 'Metric ↔ Imperial Cross-Conversion',
                body: 'Converting between the two systems requires fixed bridge constants. The inch is legally defined as exactly 25.4 mm, which anchors the entire cross-system conversion chain.',
                equations: [
                    { label: 'Inches to centimeters', formula: '1 in = 2.54 cm → cm = in × 2.54', example: '12 in = 30.48 cm' },
                    { label: 'Feet to meters', formula: '1 ft = 0.3048 m → m = ft × 0.3048', example: '6 ft = 1.8288 m' },
                    { label: 'Miles to kilometers', formula: '1 mi = 1.60934 km → km = mi × 1.60934', example: '100 mi ≈ 160.93 km' },
                    { label: 'Kilometers to miles', formula: 'mi = km ÷ 1.60934', example: '50 km ≈ 31.07 mi' },
                ],
                note: 'A useful approximation: 1 mile ≈ 1.6 km. For quick estimates, multiply miles by 1.6 or divide km by 1.6.',
            },
            {
                title: 'Nautical Mile',
                body: 'The nautical mile is used in aviation and maritime navigation. It is defined as exactly 1,852 meters and corresponds to one arcminute of latitude along any meridian of the Earth, making it directly tied to Earth\'s geometry.',
                equations: [
                    { label: 'Nautical mile to kilometers', formula: '1 nmi = 1.852 km', example: '10 nmi = 18.52 km' },
                    { label: 'Nautical mile to statute miles', formula: '1 nmi ≈ 1.15078 mi', example: '100 nmi ≈ 115.08 mi' },
                ],
            },
        ],
        didYouKnow: 'The meter was originally defined in 1793 as one ten-millionth of the distance from the equator to the North Pole along a meridian through Paris.',
    },
    {
        key: 'mass',
        title: 'Mass & Weight',
        icon: <Weight size={22} />,
        color: '#8b5cf6',
        tagline: 'Measuring matter and gravitational force',
        siUnit: 'Kilogram (kg)',
        description:
            'Mass is a fundamental property of matter that quantifies its resistance to acceleration (inertia). Weight, by contrast, is the force exerted by gravity on a mass — it varies with gravitational field strength, while mass remains constant. In everyday contexts, "weight" is often used to mean mass. The kilogram (kg) is the SI base unit for mass and since 2019 is defined in terms of Planck\'s constant (h = 6.62607015 × 10⁻³⁴ J·s), replacing the old physical platinum-iridium prototype.',
        subtopics: [
            {
                title: 'Metric Mass Units',
                body: 'The metric system scales mass using the same prefix pattern as length. The gram (g) is the conceptual base from which the kilogram is built, though the kilogram is the official SI unit. For large-scale measurements, the metric tonne (1,000 kg) is widely used in industry and trade.',
                equations: [
                    { label: '1 kilogram to grams', formula: '1 kg = 1,000 g', example: '3.5 kg = 3,500 g' },
                    { label: '1 gram to milligrams', formula: '1 g = 1,000 mg', example: '0.5 g = 500 mg' },
                    { label: '1 metric tonne to kilograms', formula: '1 t = 1,000 kg', example: '2.4 t = 2,400 kg' },
                ],
            },
            {
                title: 'Imperial & Avoirdupois System',
                body: 'The avoirdupois system is used for general-purpose weight in the US and UK. It defines the pound as the primary unit, subdivided into ounces and further grouped into stones (UK) and tons.',
                equations: [
                    { label: '1 pound to ounces', formula: '1 lb = 16 oz', example: '4 lb = 64 oz' },
                    { label: '1 stone to pounds', formula: '1 stone = 14 lb', example: '11 stone = 154 lb' },
                    { label: 'Short ton to pounds', formula: '1 short ton = 2,000 lb', },
                ],
            },
            {
                title: 'Metric ↔ Imperial Cross-Conversion',
                body: 'The pound is defined as exactly 0.45359237 kg. This exact definition makes all cross-system conversions precise rather than approximate.',
                equations: [
                    { label: 'Kilograms to pounds', formula: 'lb = kg × 2.20462', example: '70 kg ≈ 154.32 lb' },
                    { label: 'Pounds to kilograms', formula: 'kg = lb × 0.453592', example: '150 lb ≈ 68.04 kg' },
                    { label: 'Ounces to grams', formula: 'g = oz × 28.3495', example: '8 oz ≈ 226.80 g' },
                    { label: 'Grams to ounces', formula: 'oz = g ÷ 28.3495', example: '100 g ≈ 3.527 oz' },
                ],
                note: 'A practical approximation: 1 kg ≈ 2.2 lb. For body weight, divide kilograms by 0.453 to get pounds.',
            },
        ],
        didYouKnow: 'The kilogram was the last SI base unit still defined by a physical artifact — a platinum-iridium cylinder in Paris — until 2019 when it was redefined using fundamental constants of nature.',
    },
    {
        key: 'temperature',
        title: 'Temperature',
        icon: <Thermometer size={22} />,
        color: '#ef4444',
        tagline: 'Measuring thermal energy and heat',
        siUnit: 'Kelvin (K)',
        description:
            'Temperature measures the average kinetic energy of particles in a substance. Unlike most unit conversions which use simple multiplication, temperature scales differ in both their zero points (offset) and their degree sizes (scale), requiring a two-step transformation involving both addition/subtraction and multiplication. The three scales in common use — Celsius, Fahrenheit, and Kelvin — each have distinct historical origins and scientific roles.',
        subtopics: [
            {
                title: 'Celsius (°C)',
                body: 'Proposed by Anders Celsius in 1742, the Celsius scale defines 0°C as the freezing point of water and 100°C as the boiling point at standard atmospheric pressure. It is used in virtually every country for everyday temperature and is the scale of choice in most scientific contexts outside thermodynamics.',
                equations: [
                    { label: 'Celsius to Fahrenheit', formula: '°F = (°C × 9/5) + 32', example: '100°C = 212°F, 0°C = 32°F' },
                    { label: 'Celsius to Kelvin', formula: 'K = °C + 273.15', example: '25°C = 298.15 K' },
                ],
                note: 'The degree sizes of Celsius and Kelvin are identical — they share the same scale, differing only in their zero point.',
            },
            {
                title: 'Fahrenheit (°F)',
                body: 'Developed by Daniel Gabriel Fahrenheit around 1724, this scale was calibrated using a brine solution for 0°F and human body temperature for the upper reference. It remains the primary temperature scale in the United States for everyday use. A Fahrenheit degree is 5/9 the size of a Celsius degree.',
                equations: [
                    { label: 'Fahrenheit to Celsius', formula: '°C = (°F − 32) × 5/9', example: '98.6°F = 37°C (body temp)' },
                    { label: 'Fahrenheit to Kelvin', formula: 'K = (°F − 32) × 5/9 + 273.15', example: '32°F = 273.15 K' },
                ],
            },
            {
                title: 'Kelvin (K)',
                body: 'The Kelvin scale is the SI unit of thermodynamic temperature. Its zero point — absolute zero (0 K) — is the theoretical temperature at which all molecular motion ceases. Crucially, no degree symbol is used with Kelvin (it is "298 K", not "298°K"). The Kelvin is used universally in scientific and engineering thermodynamics.',
                equations: [
                    { label: 'Kelvin to Celsius', formula: '°C = K − 273.15', example: '0 K = −273.15°C' },
                    { label: 'Kelvin to Fahrenheit', formula: '°F = (K − 273.15) × 9/5 + 32', example: '373.15 K = 212°F' },
                ],
                note: 'Absolute zero is 0 K = −273.15°C = −459.67°F. It is physically impossible to reach temperatures below 0 K.',
            },
            {
                title: 'Key Reference Points',
                body: 'Understanding landmark temperatures in all three scales helps build intuition for cross-scale conversions and contextual reasonableness checks.',
                equations: [
                    { label: 'Water freezing point', formula: '0°C = 32°F = 273.15 K' },
                    { label: 'Normal body temperature', formula: '37°C = 98.6°F = 310.15 K' },
                    { label: 'Water boiling point (1 atm)', formula: '100°C = 212°F = 373.15 K' },
                    { label: 'Absolute zero', formula: '−273.15°C = −459.67°F = 0 K' },
                ],
            },
        ],
        didYouKnow: 'The Celsius scale was originally inverted — Anders Celsius defined 0° as boiling and 100° as freezing. It was reversed after his death to match our modern convention.',
    },
    {
        key: 'area',
        title: 'Area',
        icon: <Square size={22} />,
        color: '#10b981',
        tagline: 'Two-dimensional extent of surfaces',
        siUnit: 'Square Meter (m²)',
        description:
            'Area measures the two-dimensional extent of a surface. Because area is derived from length squared, unit conversions involve squaring the linear conversion factor — a common source of errors. For example, since 1 m = 100 cm, it follows that 1 m² = 10,000 cm² (not 100 cm²). Area units appear in construction, land surveying, agriculture, and materials science, with a wide variety of historical units still in common use across different fields and regions.',
        subtopics: [
            {
                title: 'Metric Area Units',
                body: 'Metric area units follow the squared-prefix pattern. The square meter (m²) is the SI base unit. The hectare (ha) and are (a) are non-SI units accepted for use with the SI, especially in land measurement.',
                equations: [
                    { label: '1 m² to cm²', formula: '1 m² = 10,000 cm²', example: '3 m² = 30,000 cm²' },
                    { label: '1 hectare to m²', formula: '1 ha = 10,000 m²', example: '5 ha = 50,000 m²' },
                    { label: '1 km² to hectares', formula: '1 km² = 100 ha', example: '2.5 km² = 250 ha' },
                    { label: '1 are to m²', formula: '1 a = 100 m²' },
                ],
            },
            {
                title: 'Imperial Area Units',
                body: 'The imperial system uses squared versions of its linear units, plus the acre as a traditional land measurement unit. The acre originated from the area a yoke of oxen could plow in one day.',
                equations: [
                    { label: '1 acre to square feet', formula: '1 acre = 43,560 ft²', example: '2 acres = 87,120 ft²' },
                    { label: '1 square mile to acres', formula: '1 mi² = 640 acres' },
                    { label: '1 square yard to square feet', formula: '1 yd² = 9 ft²' },
                    { label: '1 square foot to square inches', formula: '1 ft² = 144 in²' },
                ],
            },
            {
                title: 'Metric ↔ Imperial Cross-Conversion',
                body: 'Cross-system area conversions require squaring the linear bridge constant. Since 1 inch = 2.54 cm exactly, 1 in² = 6.4516 cm² exactly.',
                equations: [
                    { label: 'Square meters to square feet', formula: '1 m² = 10.7639 ft² → ft² = m² × 10.7639', example: '50 m² ≈ 538.2 ft²' },
                    { label: 'Square feet to square meters', formula: 'm² = ft² × 0.0929', example: '1,000 ft² ≈ 92.9 m²' },
                    { label: 'Hectares to acres', formula: '1 ha = 2.47105 acres', example: '10 ha ≈ 24.71 acres' },
                    { label: 'Acres to hectares', formula: '1 acre = 0.404686 ha', example: '100 acres ≈ 40.47 ha' },
                ],
                note: 'For real estate: 1,000 sq ft ≈ 93 m². A useful anchor: a standard American football field (minus end zones) is about 1 acre.',
            },
        ],
        didYouKnow: 'The acre was historically defined as the area that could be plowed by one man with one ox in a single day — roughly 40 × 4 rods (a furlong by a chain).',
    },
    {
        key: 'volume',
        title: 'Volume & Capacity',
        icon: <Waves size={22} />,
        color: '#06b6d4',
        tagline: 'Three-dimensional space and liquid capacity',
        siUnit: 'Cubic Meter (m³) / Liter (L)',
        description:
            'Volume measures three-dimensional space occupied by or enclosed within an object. Because volume is length cubed, conversion factors are the cube of the linear conversion factor — making intuitive estimation prone to large errors. The liter (L), defined as 1 dm³ = 0.001 m³, is the practical unit for liquids and gases in everyday use. Volume units are critical in chemistry, cooking, fluid dynamics, and fuel systems.',
        subtopics: [
            {
                title: 'Metric Volume Units',
                body: 'The liter and milliliter are the everyday metric volume units. Scientific work often uses cubic meters and its submultiples. Since 1 L = 1 dm³ = 1,000 cm³ = 1,000 mL, these relationships are exact by definition.',
                equations: [
                    { label: '1 liter to milliliters', formula: '1 L = 1,000 mL', example: '2.5 L = 2,500 mL' },
                    { label: '1 cubic meter to liters', formula: '1 m³ = 1,000 L', example: '0.5 m³ = 500 L' },
                    { label: '1 liter to cubic centimeters', formula: '1 L = 1,000 cm³', },
                ],
            },
            {
                title: 'US Customary Volume Units',
                body: 'The US customary system has a complex hierarchy of volume units used in cooking, medicine, and trade. Crucially, US and UK "gallons" and "fluid ounces" are different units with different values.',
                equations: [
                    { label: '1 US gallon hierarchy', formula: '1 gal = 4 qt = 8 pt = 16 cups = 128 fl oz', },
                    { label: '1 US cup to fluid ounces', formula: '1 cup = 8 fl oz', example: '2 cups = 16 fl oz' },
                    { label: '1 US gallon to liters', formula: '1 US gal = 3.78541 L', example: '10 US gal ≈ 37.85 L' },
                ],
            },
            {
                title: 'UK Imperial Volume Units',
                body: 'The UK Imperial system uses larger gallons and pints than the US system. A UK pint is 568 mL vs the US pint of 473 mL — a significant difference relevant to beer and recipes.',
                equations: [
                    { label: '1 UK gallon to liters', formula: '1 UK gal = 4.54609 L', example: '5 UK gal ≈ 22.73 L' },
                    { label: 'UK gallon vs US gallon', formula: '1 UK gal ≈ 1.20095 US gal' },
                    { label: '1 UK pint to milliliters', formula: '1 UK pt = 568.261 mL' },
                    { label: '1 US pint to milliliters', formula: '1 US pt = 473.176 mL' },
                ],
                note: 'UK and US fluid ounces also differ: 1 UK fl oz = 28.413 mL, while 1 US fl oz = 29.574 mL.',
            },
            {
                title: 'Cubic Imperial ↔ Metric',
                body: 'Cubic feet and cubic inches are used in engineering, shipping, and HVAC. These conversions are the cubes of their linear equivalents.',
                equations: [
                    { label: 'Cubic feet to liters', formula: '1 ft³ = 28.3168 L', example: '10 ft³ ≈ 283.17 L' },
                    { label: 'Cubic inches to mL', formula: '1 in³ = 16.3871 mL', example: '61 in³ ≈ 1,000 mL' },
                ],
            },
        ],
        didYouKnow: 'One liter of water at 4°C has a mass of almost exactly 1 kilogram — this near-perfect relationship was intentional in the original metric system design.',
    },
    {
        key: 'speed',
        title: 'Speed & Velocity',
        icon: <Wind size={22} />,
        color: '#f59e0b',
        tagline: 'Rate of change of position over time',
        siUnit: 'Meters per second (m/s)',
        description:
            'Speed is a scalar quantity expressing how fast an object is moving — the magnitude of distance traveled per unit time. Velocity is speed with a defined direction (vector). Speed conversion is a derived unit conversion involving both length and time. Different fields use different speed conventions: meteorology uses km/h, aviation uses knots, automotive uses mph or km/h, and physics uses m/s.',
        subtopics: [
            {
                title: 'Core Speed Conversions',
                body: 'All speed units reduce to a ratio of distance over time. Converting speed units requires applying the conversion factors for both the distance unit and the time unit. The SI unit m/s is the scientific standard.',
                equations: [
                    { label: 'km/h to m/s', formula: 'm/s = km/h ÷ 3.6', example: '90 km/h = 25 m/s' },
                    { label: 'm/s to km/h', formula: 'km/h = m/s × 3.6', example: '10 m/s = 36 km/h' },
                    { label: 'mph to km/h', formula: 'km/h = mph × 1.60934', example: '60 mph ≈ 96.56 km/h' },
                    { label: 'km/h to mph', formula: 'mph = km/h ÷ 1.60934', example: '100 km/h ≈ 62.14 mph' },
                ],
            },
            {
                title: 'Knots (Nautical & Aviation)',
                body: 'A knot (kn or kt) is one nautical mile per hour. It is the standard speed unit in maritime and aviation contexts worldwide. Its definition ties directly to Earth\'s angular geometry.',
                equations: [
                    { label: 'Knots to km/h', formula: 'km/h = kn × 1.852', example: '100 kn = 185.2 km/h' },
                    { label: 'Knots to mph', formula: 'mph = kn × 1.15078', example: '200 kn ≈ 230.16 mph' },
                    { label: 'Knots to m/s', formula: 'm/s = kn × 0.514444', example: '10 kn ≈ 5.14 m/s' },
                ],
                note: 'The cruising speed of a commercial aircraft is typically 450–500 knots (≈ 835–925 km/h or ≈ 520–575 mph).',
            },
            {
                title: 'Speed of Light & Mach Number',
                body: 'In physics and aerospace, two special reference speeds appear frequently: the speed of light (c) and the speed of sound (Mach 1). Mach number is the ratio of object speed to local speed of sound, which varies with altitude and temperature.',
                equations: [
                    { label: 'Speed of light', formula: 'c = 299,792,458 m/s ≈ 1,079,252,849 km/h' },
                    { label: 'Mach 1 at sea level (20°C)', formula: '≈ 343 m/s ≈ 1,235 km/h ≈ 767 mph' },
                    { label: 'Mach number formula', formula: 'M = v ÷ v_sound', example: 'v = 686 m/s → M = 2 (Mach 2)' },
                ],
            },
        ],
        didYouKnow: 'The "knot" gets its name from the 17th-century practice of measuring ship speed by counting the knots on a rope tied to a log thrown overboard — the chip log method.',
    },
    {
        key: 'time',
        title: 'Time',
        icon: <Clock size={22} />,
        color: '#6366f1',
        tagline: 'The progression of events from past to future',
        siUnit: 'Second (s)',
        description:
            'Time is one of the seven fundamental SI base quantities. The second (s) is defined since 2019 by the cesium-133 atom\'s hyperfine transition frequency: exactly 9,192,631,770 oscillations. Unlike most physical quantities, time has no known reversal — it flows in one direction (the "arrow of time"). Time conversions are multiplicative chains based on the hierarchical structure of seconds → minutes → hours → days → years.',
        subtopics: [
            {
                title: 'Standard Time Hierarchy',
                body: 'The standard time hierarchy is built on exact, defined relationships. The only irregularity occurs at the calendar level, where months and years vary in duration due to Earth\'s non-integer orbital period.',
                equations: [
                    { label: 'Seconds to minutes', formula: '1 min = 60 s', example: '3 min = 180 s' },
                    { label: 'Minutes to hours', formula: '1 hr = 60 min = 3,600 s', example: '2 hr = 7,200 s' },
                    { label: 'Hours to days', formula: '1 day = 24 hr = 86,400 s', example: '7 days = 604,800 s' },
                    { label: 'Days to weeks', formula: '1 week = 7 days', },
                ],
            },
            {
                title: 'Months, Years & Calendar Complexity',
                body: 'Calendar units are inherently irregular. A month varies from 28 to 31 days. A year is approximately 365.25 days (hence leap years every 4 years, with corrections). These conversions use standard average values.',
                equations: [
                    { label: 'Average month', formula: '1 month ≈ 30.4375 days ≈ 2,629,800 s', },
                    { label: 'Julian year', formula: '1 year = 365.25 days = 31,557,600 s', },
                    { label: 'Gregorian year (avg)', formula: '1 year ≈ 365.2425 days ≈ 31,556,952 s', },
                ],
                note: 'For precise astronomical calculations, the Julian year (365.25 days) is used. The difference between Gregorian and Julian years is ~26 seconds — it accumulates to 1 day in ~3,300 years.',
            },
            {
                title: 'Sub-second & Scientific Time Units',
                body: 'Modern science and technology require time resolution far below one second. Computing, telecommunications, and particle physics all operate on nanosecond or shorter timescales.',
                equations: [
                    { label: 'Milliseconds', formula: '1 ms = 10⁻³ s', example: 'Human blink ≈ 100–400 ms' },
                    { label: 'Microseconds', formula: '1 μs = 10⁻⁶ s', example: 'CPU clock cycle ≈ 0.3 ns at 3 GHz' },
                    { label: 'Nanoseconds', formula: '1 ns = 10⁻⁹ s', example: 'Light travels ≈ 30 cm in 1 ns' },
                    { label: 'Picoseconds', formula: '1 ps = 10⁻¹² s', },
                ],
            },
        ],
        didYouKnow: 'The second was originally defined as 1/86,400 of a mean solar day. The cesium atomic clock definition, adopted in 1967, is so precise that it would not gain or lose a second in 300 million years.',
    },
    {
        key: 'energy',
        title: 'Energy & Work',
        icon: <Zap size={22} />,
        color: '#eab308',
        tagline: 'The capacity to do work or produce heat',
        siUnit: 'Joule (J)',
        description:
            'Energy is the capacity to do work or transfer heat. It appears in many forms — kinetic, potential, thermal, chemical, electrical, nuclear — and can be converted between forms but never created or destroyed (conservation of energy, first law of thermodynamics). The joule (J) is the SI unit: 1 J = 1 kg·m²/s². Energy conversions are critical in nutrition (Calories), electricity billing (kWh), thermodynamics (BTU), and chemistry.',
        subtopics: [
            {
                title: 'Joule & SI Derivatives',
                body: 'The joule is a relatively small unit. Everyday and industrial applications scale up to kilojoules, megajoules, and gigajoules. One joule is the energy transferred when a force of 1 Newton moves an object 1 meter.',
                equations: [
                    { label: '1 kJ to joules', formula: '1 kJ = 1,000 J', example: '8.4 kJ = 8,400 J' },
                    { label: 'Watt-hour to joules', formula: '1 Wh = 3,600 J', },
                    { label: 'Kilowatt-hour to joules', formula: '1 kWh = 3,600,000 J = 3.6 MJ', example: '10 kWh = 36 MJ' },
                ],
            },
            {
                title: 'Calorie & Food Energy',
                body: 'Two distinct "calorie" units cause frequent confusion. The small calorie (cal) is a physics unit; the food Calorie (Cal, or kilocalorie, kcal) is 1,000 times larger. Nutrition labels always use the larger kilocalorie, often written as "Calorie" (capital C).',
                equations: [
                    { label: 'Small calorie (thermochemical)', formula: '1 cal = 4.184 J', example: '100 cal = 418.4 J' },
                    { label: 'Food Calorie (kilocalorie)', formula: '1 kcal = 1 Cal = 4,184 J = 4.184 kJ', example: '2,000 kcal/day = 8.368 MJ' },
                    { label: 'kcal to kJ', formula: 'kJ = kcal × 4.184', example: '500 kcal = 2,092 kJ' },
                ],
                note: 'A standard adult diet of 2,000 kcal provides about 8.37 MJ of chemical energy per day.',
            },
            {
                title: 'BTU (British Thermal Unit)',
                body: 'The BTU is the energy required to raise the temperature of 1 pound of water by 1°F. It remains widely used in HVAC, heating, and air conditioning specifications in the United States.',
                equations: [
                    { label: '1 BTU to joules', formula: '1 BTU = 1,055.06 J', },
                    { label: 'BTU to kilocalories', formula: '1 BTU ≈ 0.252 kcal', },
                    { label: 'BTU/h to watts', formula: '1 BTU/h ≈ 0.29307 W', example: '10,000 BTU/h AC ≈ 2,930.7 W ≈ 2.93 kW' },
                ],
            },
            {
                title: 'Kilowatt-hour (kWh) in Practical Context',
                body: 'The kWh is the unit on electricity bills worldwide. It represents the energy consumed by a 1 kW device running for 1 hour. Understanding kWh helps evaluate appliance efficiency and energy costs.',
                equations: [
                    { label: '1 kWh definition', formula: '1 kWh = 1 kW × 1 h = 3.6 MJ', },
                    { label: 'kWh from power & time', formula: 'kWh = W × h ÷ 1,000', example: '100 W bulb × 10 h = 1 kWh' },
                ],
            },
        ],
        didYouKnow: 'One kilowatt-hour — the typical unit on electricity bills — is enough energy to boil about 8–9 liters of water, power a 60-watt bulb for over 16 hours, or charge a smartphone roughly 50 times.',
    },
    {
        key: 'power',
        title: 'Power',
        icon: <Battery size={22} />,
        color: '#f97316',
        tagline: 'Rate of energy transfer over time',
        siUnit: 'Watt (W)',
        description:
            'Power is the rate at which energy is transferred, converted, or consumed — the amount of work done per unit time. The watt (W) is the SI unit: 1 W = 1 J/s = 1 kg·m²/s³. Power distinctions are critical in electrical engineering (appliance ratings), mechanical engineering (engine output), and thermodynamics (heat transfer rates). The horsepower (hp), originating with James Watt to market steam engines, remains widely used in automotive contexts.',
        subtopics: [
            {
                title: 'Watt & Metric Power Units',
                body: 'Power scales span many orders of magnitude: from microwatts in microelectronics to gigawatts in power plants. The watt uses standard SI prefixes throughout.',
                equations: [
                    { label: '1 kW to watts', formula: '1 kW = 1,000 W', example: 'Hair dryer ≈ 1.5 kW' },
                    { label: '1 MW to kW', formula: '1 MW = 1,000 kW = 1,000,000 W', example: 'Small power plant ≈ 50 MW' },
                    { label: 'Power, energy, time', formula: 'P (W) = E (J) ÷ t (s)', example: '360 J in 60 s = 6 W' },
                ],
            },
            {
                title: 'Horsepower (hp)',
                body: 'Horsepower was defined by James Watt as the rate at which a horse could do work, to sell his steam engines by comparison. There are several definitions; the mechanical horsepower (550 ft·lbf/s) is standard in the US for engines.',
                equations: [
                    { label: 'Mechanical hp to watts', formula: '1 hp = 745.699 W', example: '200 hp engine ≈ 149.14 kW' },
                    { label: 'Metric hp (PS) to watts', formula: '1 PS = 735.499 W', },
                    { label: 'Watts to horsepower', formula: 'hp = W ÷ 745.699', example: '100 kW ≈ 134.1 hp' },
                ],
                note: 'European car specs often use "PS" (Pferdestärke — metric horsepower), which is slightly less than the US mechanical hp. 100 PS ≈ 98.6 US hp.',
            },
        ],
        didYouKnow: 'James Watt defined "1 horsepower" after observing that a mill horse could turn a 12-foot mill wheel 144 times per hour. He set 33,000 ft·lbf/min as the standard — slightly higher than an average horse, to ensure his engines always appeared to "beat" a horse.',
    },
    {
        key: 'pressure',
        title: 'Pressure',
        icon: <Gauge size={22} />,
        color: '#84cc16',
        tagline: 'Force distributed over a surface area',
        siUnit: 'Pascal (Pa)',
        description:
            'Pressure is defined as force per unit area: P = F/A. The pascal (Pa) is the SI unit: 1 Pa = 1 N/m² = 1 kg/(m·s²). Pressure governs fluid dynamics, atmospheric science, tire inflation, blood pressure, and scuba diving. The diversity of pressure units reflects the many independent fields that developed measurement conventions before standardization — each with its own natural reference points.',
        subtopics: [
            {
                title: 'Pascal & SI Derivatives',
                body: 'The pascal is a very small unit — standard atmospheric pressure is about 101,325 Pa, so kilopascals (kPa) and megapascals (MPa) are frequently used in engineering.',
                equations: [
                    { label: '1 kPa to Pa', formula: '1 kPa = 1,000 Pa', },
                    { label: '1 MPa to kPa', formula: '1 MPa = 1,000 kPa = 1,000,000 Pa', example: 'Hydraulic systems: 10–35 MPa' },
                    { label: 'Standard atmosphere', formula: '1 atm = 101,325 Pa = 101.325 kPa', },
                ],
            },
            {
                title: 'Bar & Atmosphere',
                body: 'The bar is widely used in meteorology, diving, and industrial gas applications. 1 bar is approximately equal to 1 atm, making it convenient for everyday pressure discussions. The difference is less than 2%.',
                equations: [
                    { label: '1 bar to Pa', formula: '1 bar = 100,000 Pa = 100 kPa', },
                    { label: 'Bar vs atmosphere', formula: '1 atm = 1.01325 bar', },
                    { label: 'Millibar (weather)', formula: '1 mbar = 100 Pa = 1 hPa', example: 'Sea-level pressure ≈ 1013.25 mbar' },
                ],
            },
            {
                title: 'PSI (Pounds per Square Inch)',
                body: 'PSI is the dominant pressure unit in the US for everyday applications: tire pressure, blood pressure gauges, compressed air systems, and plumbing. It is a unit of force (pounds-force) per area (square inches).',
                equations: [
                    { label: '1 PSI to Pa', formula: '1 psi = 6,894.757 Pa ≈ 6.895 kPa', },
                    { label: 'PSI to bar', formula: '1 psi ≈ 0.0689476 bar', example: '35 psi tire ≈ 2.41 bar' },
                    { label: 'Bar to PSI', formula: '1 bar ≈ 14.5038 psi', example: '2.5 bar ≈ 36.26 psi' },
                ],
                note: 'Tire pressure is typically 32–36 PSI (2.2–2.5 bar). Blood pressure of 120/80 mmHg = 16/10.7 kPa ≈ 2.32/1.55 psi.',
            },
            {
                title: 'mmHg & Medical Pressure',
                body: 'Millimeters of mercury (mmHg), or Torr, is the traditional medical pressure unit for blood pressure and gas partial pressures. It refers to the pressure exerted by a 1 mm column of mercury under standard gravity.',
                equations: [
                    { label: '1 mmHg to Pa', formula: '1 mmHg = 133.322 Pa', },
                    { label: '1 atm to mmHg', formula: '1 atm = 760 mmHg', },
                    { label: 'kPa to mmHg', formula: 'mmHg = kPa × 7.50062', example: '16 kPa ≈ 120 mmHg (systolic)' },
                ],
            },
        ],
        didYouKnow: 'Blood pressure readings (e.g., 120/80 mmHg) still use millimeters of mercury — a unit tied to 17th-century mercury barometer physics — because medical tradition has resisted metrication in this context.',
    },
    {
        key: 'data',
        title: 'Digital Data Storage',
        icon: <Database size={22} />,
        color: '#ec4899',
        tagline: 'Quantifying digital information',
        siUnit: 'Byte (B)',
        description:
            'Digital data is measured in bits (binary digits: 0 or 1) and bytes (groups of 8 bits). Data storage units use the prefix system, but with an important distinction: traditional computing uses binary prefixes (powers of 2) while SI uses decimal prefixes (powers of 10). This creates a persistent ambiguity — a "gigabyte" on a hard drive label (10⁹ bytes) is smaller than a "gigabyte" in operating system RAM reports (2³⁰ bytes). The IEC introduced binary prefixes (kibibyte, mebibyte, gibibyte) to resolve this, though adoption is still partial.',
        subtopics: [
            {
                title: 'Bits and Bytes',
                body: 'The bit is the atomic unit of digital information. A byte (8 bits) can represent 256 distinct values (2⁸). Networking uses bits per second (bps), while storage uses bytes. This distinction is intentional — it makes file sizes appear larger in bits to obscure comparisons.',
                equations: [
                    { label: '1 byte definition', formula: '1 B = 8 bits', example: '1 ASCII character = 1 byte = 8 bits' },
                    { label: 'Bits vs bytes in networking', formula: '100 Mbps link = 12.5 MB/s transfer speed', },
                    { label: 'Conversion formula', formula: 'MB/s = Mbps ÷ 8', example: '50 Mbps ÷ 8 = 6.25 MB/s' },
                ],
                note: 'Internet speed tests report in Mbps (megabits), while download managers show MB/s (megabytes). Always divide by 8 to compare.',
            },
            {
                title: 'Decimal (SI) Prefixes — Storage Devices',
                body: 'Hard drive manufacturers and storage device specifications use decimal (SI) prefixes. 1 gigabyte = 10⁹ bytes exactly in this convention. This is why a 1 TB hard drive shows only ~931 GiB in your operating system.',
                equations: [
                    { label: '1 KB (decimal)', formula: '1 KB = 10³ B = 1,000 B', },
                    { label: '1 MB (decimal)', formula: '1 MB = 10⁶ B = 1,000,000 B', },
                    { label: '1 GB (decimal)', formula: '1 GB = 10⁹ B = 1,000,000,000 B', },
                    { label: '1 TB (decimal)', formula: '1 TB = 10¹² B', },
                ],
            },
            {
                title: 'Binary (IEC) Prefixes — Operating Systems',
                body: 'Operating systems (Windows, Linux, macOS) historically reported storage in binary-based units. 1 binary "gigabyte" = 2³⁰ = 1,073,741,824 bytes. The IEC names for these are kibibyte (KiB), mebibyte (MiB), gibibyte (GiB).',
                equations: [
                    { label: '1 KiB (binary)', formula: '1 KiB = 2¹⁰ B = 1,024 B', },
                    { label: '1 MiB (binary)', formula: '1 MiB = 2²⁰ B = 1,048,576 B', },
                    { label: '1 GiB (binary)', formula: '1 GiB = 2³⁰ B = 1,073,741,824 B', },
                    { label: 'GB vs GiB gap', formula: '1 GiB ÷ 1 GB = 1.073741824 ≈ 7.4% larger', example: '1 TB drive ≈ 931 GiB in OS' },
                ],
            },
        ],
        didYouKnow: 'The word "bit" is a portmanteau of "binary digit," coined by statistician John Tukey in 1946. Claude Shannon popularized it in his landmark 1948 paper "A Mathematical Theory of Communication."',
    },
    {
        key: 'angle',
        title: 'Plane Angles',
        icon: <Crosshair size={22} />,
        color: '#14b8a6',
        tagline: 'Measuring rotational and angular extent',
        siUnit: 'Radian (rad)',
        description:
            'An angle measures the rotation between two rays sharing a common endpoint (vertex). The radian is the SI unit: it is defined as the angle subtended at the center of a circle by an arc equal in length to the radius. The degree, though not an SI unit, is deeply embedded in navigation, geometry, and everyday use. The conversion between degrees and radians involves the constant π, making it one of the few unit conversions with an irrational factor.',
        subtopics: [
            {
                title: 'Degrees (°)',
                body: 'The degree divides a full circle into 360 equal parts — a number chosen by ancient Babylonians for its high divisibility (360 = 2³ × 3² × 5 × 2). Degrees are subdivided into arcminutes (1° = 60′) and arcseconds (1′ = 60″), used in astronomy, GPS coordinates, and surveying.',
                equations: [
                    { label: 'Full circle', formula: '360° = 1 full rotation', },
                    { label: 'Right angle', formula: '90° = π/2 rad', },
                    { label: '1 degree to arcminutes', formula: '1° = 60 arcminutes (′)', example: '45° = 2,700 arcminutes' },
                    { label: '1 arcminute to arcseconds', formula: "1′ = 60 arcseconds (″)", },
                ],
            },
            {
                title: 'Radians (rad)',
                body: 'The radian is the natural unit of angle in mathematics because it makes trigonometric formulas cleaner — no conversion constants needed. The arc length formula s = rθ works only with radians. Calculus derivatives of sin and cos are exact only in radians.',
                equations: [
                    { label: 'Degrees to radians', formula: 'rad = deg × π ÷ 180', example: '180° = π rad ≈ 3.14159 rad' },
                    { label: 'Radians to degrees', formula: 'deg = rad × 180 ÷ π', example: '1 rad ≈ 57.2958°' },
                    { label: 'Full circle in radians', formula: '2π rad = 360°', },
                ],
                note: 'In calculus and physics, always use radians. The derivative of sin(x) is cos(x) only when x is in radians.',
            },
            {
                title: 'Gradians (grad)',
                body: 'Gradians (also called gon or grade) divide a right angle into 100 parts and a full circle into 400 parts. This makes right-angle calculations simple and was promoted during the French Revolution\'s metrication push. Used primarily in surveying and some European engineering contexts.',
                equations: [
                    { label: 'Full circle in gradians', formula: '400 grad = 360°', },
                    { label: 'Right angle in gradians', formula: '100 grad = 90°', },
                    { label: 'Gradians to degrees', formula: 'deg = grad × 0.9', example: '100 grad = 90°' },
                    { label: 'Degrees to gradians', formula: 'grad = deg × 10/9', example: '45° = 50 grad' },
                ],
            },
        ],
        didYouKnow: 'The ancient Babylonians chose 360 degrees for a circle because they believed a year had 360 days. The number 360 is also highly composite — divisible by 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, and 180.',
    },
    {
        key: 'fuel',
        title: 'Fuel Consumption & Economy',
        icon: <Droplets size={22} />,
        color: '#0ea5e9',
        tagline: 'Efficiency of energy use in vehicles',
        siUnit: 'Liters per 100 km (L/100km)',
        description:
            'Fuel economy measures how efficiently a vehicle uses fuel. Two opposing conventions create non-intuitive conversions: efficiency (distance per volume, like mpg or km/L — higher is better) versus consumption (volume per distance, like L/100km — lower is better). Converting between these conventions requires taking a reciprocal, not just multiplying by a constant, making fuel economy one of the most conceptually tricky unit conversions.',
        subtopics: [
            {
                title: 'L/100km vs km/L',
                body: 'L/100km (consumption) and km/L (efficiency) are reciprocally related. L/100km is the standard in most of the world (Europe, Australia, China). km/L is standard in Japan and India. Neither is simply a scaled version of the other — they require inversion.',
                equations: [
                    { label: 'L/100km to km/L', formula: 'km/L = 100 ÷ (L/100km)', example: '5 L/100km = 20 km/L' },
                    { label: 'km/L to L/100km', formula: 'L/100km = 100 ÷ km/L', example: '12.5 km/L = 8 L/100km' },
                ],
                note: 'Important: a change from 15 to 10 L/100km saves more fuel per km than a change from 10 to 5 L/100km. Fuel savings are not linear in L/100km.',
            },
            {
                title: 'Miles per Gallon (mpg)',
                body: 'The United States and UK both use mpg, but with different gallon definitions — making US mpg and UK mpg non-comparable. A vehicle rated 30 mpg (US) is less efficient than one rated 30 mpg (UK).',
                equations: [
                    { label: 'US mpg to L/100km', formula: 'L/100km = 235.215 ÷ mpg (US)', example: '30 mpg (US) ≈ 7.84 L/100km' },
                    { label: 'UK mpg to L/100km', formula: 'L/100km = 282.481 ÷ mpg (UK)', example: '40 mpg (UK) ≈ 7.06 L/100km' },
                    { label: 'US mpg to UK mpg', formula: 'mpg (UK) = mpg (US) × 1.20095', example: '30 mpg US ≈ 36.03 mpg UK' },
                ],
            },
            {
                title: 'Converting to km/L',
                body: 'km/L is a clean efficiency metric: the number of kilometers driven on one liter of fuel. It is directly comparable across all vehicle types and easily understood.',
                equations: [
                    { label: 'US mpg to km/L', formula: 'km/L = mpg (US) × 0.425144', example: '30 mpg ≈ 12.75 km/L' },
                    { label: 'UK mpg to km/L', formula: 'km/L = mpg (UK) × 0.354006', example: '40 mpg UK ≈ 14.16 km/L' },
                ],
            },
        ],
        didYouKnow: 'Improving from 10 to 8 L/100km saves the same amount of fuel over 1,000 km (20 L) as improving from 5 to 4.35 L/100km — highlighting why the reciprocal relationship makes high-consumption vehicles the greatest targets for fuel savings.',
    },
    {
        key: 'currency',
        title: 'Currency Exchange',
        icon: <Globe2 size={22} />,
        color: '#22c55e',
        tagline: 'Converting monetary value between national currencies',
        siUnit: 'Varies (USD as reference)',
        description:
            'Currency conversion is fundamentally different from all other unit conversions — exchange rates are not physical constants but floating market prices determined by supply and demand, interest rates, inflation, trade balances, and geopolitical events. They change continuously in real-time (foreign exchange, or "forex," markets trade $7.5 trillion per day). Any static currency conversion is an approximation; only live rates from a trusted financial data source provide current accuracy.',
        subtopics: [
            {
                title: 'Exchange Rate Mechanics',
                body: 'An exchange rate expresses the price of one currency in terms of another. Rates are quoted as direct (domestic per foreign) or indirect (foreign per domestic). The "mid-market rate" is the midpoint between buy and sell rates — what banks and services charge around.',
                equations: [
                    { label: 'Direct conversion formula', formula: 'Target = Amount × (Rate_target ÷ Rate_base)', example: '100 USD × (83.1 INR/USD) = 8,310 INR' },
                    { label: 'Converting via USD base', formula: 'A→B = Amount_A ÷ Rate_A × Rate_B', example: '100 EUR ÷ 0.92 × 83.1 INR ≈ 9,032.6 INR' },
                    { label: 'Inverse rate', formula: 'Rate_B→A = 1 ÷ Rate_A→B', example: 'If USD/INR = 83.1, then INR/USD ≈ 0.01203' },
                ],
                note: 'Banks typically add a 1–3% spread over the mid-market rate. Currency exchange services at airports may charge 5–15% above mid-market.',
            },
            {
                title: 'Purchasing Power Parity (PPP)',
                body: 'Exchange rates don\'t reflect true purchasing power equality between countries. PPP rates are adjusted exchange rates that equalize the price of a standard basket of goods across countries. The "Big Mac Index" (The Economist) is a famous simplified PPP indicator.',
                equations: [
                    { label: 'PPP concept', formula: 'PPP rate: price of basket_A (in A) = price of basket_B (in B)', },
                    { label: 'PPP-adjusted GDP', formula: 'GDP (PPP) = GDP (nominal) × (PPP rate ÷ market rate)', },
                ],
            },
            {
                title: 'Cross-Currency Triangulation',
                body: 'When a direct exchange rate is unavailable, triangulate through a common intermediate currency (usually USD or EUR). This is called a "cross rate."',
                equations: [
                    { label: 'Cross rate formula', formula: 'Rate(A/C) = Rate(A/B) × Rate(B/C)', example: 'EUR/INR = EUR/USD × USD/INR = 0.92 × 83.1 ≈ 76.45' },
                ],
            },
        ],
        didYouKnow: 'The foreign exchange (forex) market is the largest financial market in the world, with over $7.5 trillion traded daily — dwarfing the $100–200 billion daily volume of major stock exchanges like NYSE.',
    },
    {
        key: 'cpu',
        title: 'Frequency',
        icon: <Cpu size={22} />,
        color: '#a855f7',
        tagline: 'Oscillations, cycles, and clock rates',
        siUnit: 'Hertz (Hz)',
        description:
            'Frequency measures how many times a repeating event occurs per unit time. The hertz (Hz) is the SI unit: 1 Hz = 1 cycle per second. Frequency is fundamental to acoustics (sound pitch), electromagnetism (light, radio waves), signal processing (sampling rates), and computing (CPU clock speeds). It is inversely related to period (T): frequency = 1/T. The frequency spectrum spans from sub-Hz geological oscillations to exahertz gamma rays.',
        subtopics: [
            {
                title: 'Hertz Scale',
                body: 'The hertz uses SI prefixes, covering a vast range from human-audible sound (20 Hz–20 kHz) through radio waves (kHz–GHz) to visible light (hundreds of THz) and beyond.',
                equations: [
                    { label: '1 kHz', formula: '1 kHz = 1,000 Hz', example: 'Middle C on piano ≈ 261.6 Hz' },
                    { label: '1 MHz', formula: '1 MHz = 10⁶ Hz', example: 'AM radio: 540–1,600 kHz; FM: 87.5–108 MHz' },
                    { label: '1 GHz', formula: '1 GHz = 10⁹ Hz', example: 'Modern CPU: 3–5 GHz clock speed' },
                    { label: '1 THz', formula: '1 THz = 10¹² Hz', example: 'Terahertz imaging gap between radio & infrared' },
                ],
            },
            {
                title: 'Frequency ↔ Period',
                body: 'Frequency and period are exact mathematical reciprocals. The period (T) is the time for one complete cycle. This relationship is used constantly in electronics, wave mechanics, and signal analysis.',
                equations: [
                    { label: 'Frequency from period', formula: 'f (Hz) = 1 ÷ T (s)', example: 'T = 0.001 s → f = 1,000 Hz = 1 kHz' },
                    { label: 'Period from frequency', formula: 'T (s) = 1 ÷ f (Hz)', example: '50 Hz mains → T = 0.02 s = 20 ms' },
                ],
            },
            {
                title: 'CPU Clock Speed Context',
                body: 'In computing, clock frequency determines how many instruction cycles a processor can execute per second. Modern CPUs operate at 3–5 GHz, executing billions of instructions per second. Performance depends on both clock speed and instructions-per-cycle (IPC) architecture.',
                equations: [
                    { label: 'Instructions per second', formula: 'IPS = clock frequency × IPC', example: '3 GHz × 4 IPC = 12 billion IPS' },
                    { label: 'Clock cycle time', formula: 'T = 1 ÷ f', example: '3 GHz CPU: T = 0.333 ns per cycle' },
                ],
                note: 'Two CPUs with the same GHz rating can have very different performance if their IPC (instructions per clock) differ — hence why comparing clock speeds across different CPU architectures is misleading.',
            },
        ],
        didYouKnow: 'Visible light is electromagnetic radiation at frequencies between roughly 430 THz (red) and 770 THz (violet) — making it a form of frequency far beyond anything electronic circuits can directly detect or generate.',
    },
];

// ─── Helper Components ──────────────────────────────────────────────────────

function EquationBlock({ eq }: { eq: Equation }) {
    return (
        <div className="my-3 rounded-xl border border-slate-100 bg-gradient-to-r from-slate-50 to-white overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center gap-0">
                <div className="px-4 py-2 sm:py-3 border-b sm:border-b-0 sm:border-r border-slate-100 min-w-[160px]">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{eq.label}</span>
                </div>
                <div className="flex-1 px-4 py-2 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <code className="text-sm sm:text-base font-mono font-semibold text-slate-800 tracking-tight">
                        {eq.formula}
                    </code>
                    {eq.example && (
                        <span className="text-xs text-slate-400 font-medium sm:ml-4 whitespace-nowrap">
                            e.g. {eq.example}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

function SubTopicSection({ sub, color }: { sub: SubTopic; color: string }) {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 rounded-full" style={{ background: color }} />
                <h3 className="text-base font-bold text-slate-800 tracking-tight">{sub.title}</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">{sub.body}</p>
            <div>
                {sub.equations.map((eq, i) => (
                    <EquationBlock key={i} eq={eq} />
                ))}
            </div>
            {sub.note && (
                <div className="mt-3 flex gap-2 p-3 rounded-xl bg-amber-50 border border-amber-100">
                    <Info size={15} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-800 leading-relaxed">{sub.note}</p>
                </div>
            )}
        </div>
    );
}

function CategoryCard({ cat }: { cat: CategoryContent }) {
    return (
        <article
            id={`unit-${cat.key}`}
            className="mb-10 rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden"
        >
            {/* Color bar */}
            <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}60)` }} />

            {/* Header */}
            <div className="px-6 sm:px-8 pt-7 pb-5">
                <div className="flex items-start gap-4">
                    <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${cat.color}15`, color: cat.color }}
                    >
                        {cat.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                {cat.title}
                            </h2>
                            <span
                                className="text-xs font-bold px-3 py-1 rounded-full tracking-wide"
                                style={{ background: `${cat.color}15`, color: cat.color }}
                            >
                                SI: {cat.siUnit}
                            </span>
                        </div>
                        <p className="text-sm font-semibold" style={{ color: cat.color }}>{cat.tagline}</p>
                    </div>
                </div>

                <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">{cat.description}</p>
            </div>

            {/* Divider */}
            <div className="mx-6 sm:mx-8 border-t border-slate-100" />

            {/* Subtopics */}
            <div className="px-6 sm:px-8 pt-6 pb-2">
                {cat.subtopics.map((sub, i) => (
                    <SubTopicSection key={i} sub={sub} color={cat.color} />
                ))}
            </div>

            {/* Did you know */}
            {cat.didYouKnow && (
                <div className="mx-6 sm:mx-8 mb-6 p-4 rounded-xl flex gap-3" style={{ background: `${cat.color}08`, border: `1px solid ${cat.color}20` }}>
                    <Lightbulb size={16} style={{ color: cat.color }} className="mt-0.5 flex-shrink-0" />
                    <div>
                        <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: cat.color }}>Did you know?</span>
                        <p className="mt-1 text-sm text-slate-600 leading-relaxed">{cat.didYouKnow}</p>
                    </div>
                </div>
            )}
        </article>
    );
}

// ─── Table of Contents ──────────────────────────────────────────────────────

function TableOfContents() {
    return (
        <nav aria-label="Table of Contents" className="mb-10 rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
            <div className="px-6 pt-5 pb-3 border-b border-slate-100 flex items-center gap-2">
                <BookOpen size={16} className="text-slate-400" />
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Table of Contents</h2>
            </div>
            <div className="px-4 py-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
                {CONTENT.map((cat, i) => (
                    <a
                        key={cat.key}
                        href={`#unit-${cat.key}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        <span className="font-mono text-xs text-slate-300 w-5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                        <span style={{ color: cat.color }} className="flex-shrink-0">{cat.icon}</span>
                        <span className="truncate">{cat.title}</span>
                        <ChevronRight size={13} className="text-slate-300 flex-shrink-0 ml-auto" />
                    </a>
                ))}
            </div>
        </nav>
    );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function TotalContent() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Mono:wght@400;500&display=swap');
        .unit-converter-content { font-family: 'Plus Jakarta Sans', sans-serif; }
        .unit-converter-content code,
        .unit-converter-content pre { font-family: 'DM Mono', monospace; }
      `}</style>

            <div
                className="unit-converter-content min-h-screen"
                style={{
                    background: 'linear-gradient(160deg, #f0f9ff 0%, #fafafa 40%, #fff7ed 100%)',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
            >
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

                    {/* ── Page Header ── */}
                    <header className="mb-12 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm mb-5">
                            <Hash size={14} className="text-slate-400" />
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Complete Reference Guide</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tighter leading-tight mb-4">
                            Unit Conversion<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500">
                                Theory & Formulas
                            </span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-slate-500 text-base sm:text-lg leading-relaxed">
                            A comprehensive textbook reference covering measurement systems, conversion equations,
                            and the science behind every unit category — from length and mass to currency and digital data.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            {[
                                { value: `${CONTENT.length}`, label: 'Categories' },
                                { value: `${CONTENT.reduce((s, c) => s + c.subtopics.length, 0)}`, label: 'Sub-topics' },
                                { value: `${CONTENT.reduce((s, c) => s + c.subtopics.reduce((s2, t) => s2 + t.equations.length, 0), 0)}+`, label: 'Equations' },
                            ].map(stat => (
                                <div key={stat.label} className="flex flex-col items-center px-6 py-3 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                    <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{stat.value}</span>
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </header>

                    {/* ── TOC ── */}
                    <TableOfContents />

                    {/* ── Category Cards ── */}
                    <main>
                        {CONTENT.map(cat => (
                            <CategoryCard key={cat.key} cat={cat} />
                        ))}
                    </main>

                    {/* ── Footer note ── */}
                    <footer className="mt-6 text-center">
                        <p className="text-xs text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            All conversion factors are based on internationally adopted SI standards, NIST reference data,
                            and official definitions. Currency rates are market-variable and provided as reference approximations only.
                            For scientific applications, consult primary standards documents (BIPM SI Brochure, NIST SP 330).
                        </p>
                    </footer>

                </div>
            </div>
        </>
    );
}
