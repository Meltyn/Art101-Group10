document.addEventListener("DOMContentLoaded", function() {
    // Ensure Tracery is available
    console.log(tracery);  // This should log the tracery object if it's loaded correctly

    // Define Tracery grammar for affirmations
    var grammar = tracery.createGrammar({
        "origin": [
            "#greeting# #statement#.",
            "#action#.",
        ],
        "greeting": [
            "I am making today count.", 
            "Today is a new day,", 
            "I am enough today.", 
            "I have the power to achieve anything today.",
            "Today, I am unstoppable.",
            "Embracing today's possibilities,",
            "Good morning, beautiful soul.",
            "My possibilities are endless.",
            "I will be kind to myself today.",
            "I will find moments of joy today.",
            "I am ready,",
            "Another day, another opportunity.",
            "Here's to a productive day!",
            "It's a wonderful time to begin,",
            "Another day to shine,",
            "Today, I choose happiness.",
            "Today, I am ready for what comes next.",
            "Rise with purpose, shine with confidence.",

        ],
        "statement": [
            "I am #adjective#",
            "I choose to #verb#",
            "I am ready for #noun#",
            "I am #verbsing#",
        ],
        "adjective": [
            "strong",
            "confident", 
            "capable", 
            "positive", 
            "focused",
            "bright",
            "ready",
            "relaxed",
            "eager",
            "happy",
            "grateful",
            "trusting",
            "adored",
            "awesome",
            "worthy",
            "playful",
            "extraordinary",
            "creative",
            "radiant",
            "brilliant",
            "cherished",
            "divine",
            "vibrant",
            "encouraging",
            "respected",
            "kind",
            "helpful",
            "victorious",
            "determined",
            "generous",
            "smart",
            "able",
            "dependable",
            "grounded",
            "infinite",
            "present",
            "appreciated",
            "safe",
            "healthy",
            "magnificent",
            "beautiful",
            "powerful",
            "fearless",
            "fierce",
            "valuable",
        

        ],
        "action": [
            "I will achieve my dreams", 
            "I will conquer my fears", 
            "I will move forward", 
            "I will embrace opportunities", 
            "I know my worth",
            "I am capable of making healthy choices",
            "It's OK for me to have fun",
            "I trust myself and my ability to handle any situation that comes my way",
            "I am worthy of connection just as I am. I am enough",
            "I am worthy of love just as I am",
            "I am capable of adapting to any situation",
            "I know that failure is not a sign of weakness, but an opportunity to grow",
            "I am proud of who I am",
            "I am proud of what I have accomplished",
            "My potential to succeed is infinite",
            "I love my body and anything it can do",
            "I find optimistic ways of dealing with difficulties",
            "I am committed to building my future and living with intention",
            "I will challenge my limits",
            "I will embrace the unknown",
            "I will ignite my creativity",
            "I will learn from every experience",
            "I will trust the process",
            "I will expand my horizons",
            "I give myself room to make mistakes and grow",
            "I am grateful for what I can do",
            "I am improving every day",
            "I will make time for what brings me joy",
            "My efforts help me succeed",
            "I choose to treat myself with kindness and understanding, even when facing difficult times",
            "I focus on thoughts that uplift me. I release thoughts that drain me and bring me down",
            "My thoughts are clear, open, and empowering",



        ],
        "verb": [
            "believe", 
            "trust", 
            "embrace", 
            "conquer",
            "love",
            "climb",
            "transform",
            "grow",
            "pursue",
            "celebrate",
            "inspire",
            "challenge",
            "accept",
            "master",
            "lead",
            "reflect",
            "discover",
            "flow",
            "elevate",
            "strenghten",
            "shine",
            "adapt",
            "empower",
            "build",

        ],
        "noun": [
            "success", 
            "abundance", 
            "growth", 
            "new beginnings", 
            "happiness",
            "possibilities",
            "balance",
            "harmony",
            "creativity",
            "clarity",
            "mindfulness",
            "achievement",
            "new beginnings",
            "joy",
            "peace",
            "courage",

        ],

        "verbsing": [
            "worthy of love",
            "a source of inspiration",
            "worthy of happiness",
            "confident in my abilities and skills",
            "creating the life I want",
            "strong in mind, body, and spirit",
            "on the right path for me",
            "always learning",


        ],
    });

    // Generate the affirmation
    var affirmation = grammar.flatten("#origin#");

    // Display the affirmation in the #affirmation div
    document.getElementById("affirmation").innerText = affirmation;
});