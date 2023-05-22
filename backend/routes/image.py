from collections import Counter
from tempfile import NamedTemporaryFile

from pm4py.statistics.attributes.log import get as attr_get
from pm4py.objects.dfg.utils import dfg_utils
from pm4py.util import xes_constants as xes
from pm4py.visualization.common.utils import *

from typing import Dict, Tuple
from graphviz import Digraph
from pandas import DataFrame

from pm4py.discovery import discover_performance_dfg
from pm4py.visualization.dfg.util.dfg_gviz import get_min_max_value
import statistics, math

DF_COLOR_ACT = ("black", "white")
BLACK_COLOR = '#%02x%02x%02x' % (0, 0, 0) 
BLUE_COLORS = ["#FFFFFF", "#EBF0FF", "#2780dc", 
    "#096cc2", "#09599f", "#09487e", "#09385e"]

def get_edges_color_soj_time(soj_time):
    """
    Gets the color for the activities based on the sojourn time

    Parameters
    ----------------
    soj_time
        Sojourn time

    Returns
    ----------------
    act_color
        Dictionary associating each activity to a color based on the sojourn time
    """
    activities_color = {}

    if len(soj_time.values()) == 0:
        return activities_color

    min_soj_time, max_soj_time = get_min_max_value(soj_time)

    MAX_RANGE = 150

    minR = 0
    minG = MAX_RANGE
    minB = 0

    variationR = MAX_RANGE
    variationG = 0
    variationB = 0

    median = statistics.median(list(soj_time.values()))

    for ac in soj_time:
        act_soj_time = soj_time[ac]

        if (act_soj_time > median):
            minR = MAX_RANGE
            minG = MAX_RANGE
            minB = 0
            variationR = 0
            variationG = -MAX_RANGE
            variationB = 0
        else:
            minR = 0
            minG = MAX_RANGE
            minB = 0
            variationR = MAX_RANGE
            variationG = 0
            variationB = 0

        relativeDifference = act_soj_time - min_soj_time
        absoluteDifference = max_soj_time - min_soj_time

        # caso a diferença seja 0, impede divisão por 0
        if absoluteDifference == 0:
            absoluteDifference = 1

        # escala logarítmica
        differenceRatio = math.log10(
            (relativeDifference / absoluteDifference) * 9 + 1
        )

        R = minR + int(differenceRatio * variationR)
        G = minG + int(differenceRatio * variationG)
        B = minB + int(differenceRatio * variationB)

        rgb = (R, G, B)

        activities_color[ac] = '#%02x%02x%02x' % rgb

    return activities_color

def break_lines(text: str, max_len: int = 25,
                join_char: str = '\n') -> str:
    """
    Breaks a text into lines of maximum length

    Parameters
    ----------------
    text
        Text to be broken
    max_len
        Maximum length of each line

    Returns
    ----------------
    lines
        List of lines
    """
    lines = []
    line = ""
    for word in text.split():
        if len(line) + len(word) > max_len:
            lines.append(line)
            line = ""
        line += word + " "
    lines.append(line)
    return join_char.join(lines)

def get_activities_color_soj_time(soj_time: dict,
                                  new_colors: list = []) -> str:
    """
    Gets the color for the activities based on the sojourn time

    Parameters
    ----------------
    soj_time
        Sojourn time
    new_colors
        A list of colors to be choose

    Returns
    ----------------
    act_color
        Dictionary associating each activity to a color based on the sojourn time
    """
    activities_color = {}

    min_soj_time, max_soj_time = get_min_max_value(soj_time)
    font_color = "black"
    for ac in soj_time:
        act_soj_time = soj_time[ac]
        relative = ((act_soj_time - min_soj_time) /
            (max_soj_time - min_soj_time + 0.00001))

        if len(new_colors) > 0:
            index = int(relative * len(new_colors))
            if index == 0 and act_soj_time > 0: index = 1
            bg_color = new_colors[index % len(new_colors)]
            is_black = relative < 0.5 or bg_color in ["#FFFFFF", "white"]
            font_color = "black" if is_black else "white"
        else:
            trans_base_color = int(255 - 100 * relative)
            trans_base_color_hex = str(hex(trans_base_color))[2:].upper()
            bg_color = f"#FF{trans_base_color_hex}{trans_base_color_hex}"
        activities_color[ac] = (font_color, bg_color)

    return activities_color

def human_readable_stat(timedelta_seconds, stat_locale: dict = {}):
    """
    Transform a timedelta expressed in seconds into a human readable string

    Parameters
    ----------
    timedelta_seconds
        Timedelta expressed in seconds
    stat_locale
        Dict mapping stat strings

    Returns
    ----------
    string
        Human readable string
    """
    timedelta_seconds = int(float(timedelta_seconds["mean"]))
    years = timedelta_seconds // 31104000
    months = timedelta_seconds // 2592000
    days = timedelta_seconds // 86400
    hours = timedelta_seconds // 3600 % 24
    minutes = timedelta_seconds // 60 % 60
    seconds = timedelta_seconds % 60
    
    if years > 0:
        return str(years) + stat_locale.get("year", "Y")
    if months > 0:
        return str(months) + stat_locale.get("month", "MO")
    if days > 0:
        return str(days) + stat_locale.get("day", "D")
    if hours > 0:
        return str(hours) + stat_locale.get("hour", "h")
    if minutes > 0:
        return str(minutes) + stat_locale.get("minute", "m")
    return str(seconds) + stat_locale.get("second", "s")

def graphviz_visualization(activities_count: dict,
                           freq_dfg: dict, perf_dfg: dict,
                           font_size: str="12",
                           start_activities: list=None,
                           end_activities: list=None,
                           image_format: str = "png",
                           bgcolor: str = "transparent"):
    """
    Do GraphViz visualization of a DFG graph
    Returns
    -----------
    viz
        Digraph object
    """
    def create_nodes(graph: Digraph, activities_count: dict, 
                     activities_to_include: list,
                     activities_color: dict,
                     activities_map: dict):
        for act in activities_to_include:
            font_color, bg_color = activities_color.get(act, DF_COLOR_ACT)
            color, style, margin = "black", "bold", "0.5,0"
            frequency = activities_count.get(act, 0)

            act_label = f" {break_lines(act)} \n"
            label = f"{act_label} {frequency} movimentos "
                
            graph.node(str(hash(act)), label, fontsize=font_size,
                    fontcolor=font_color, fillcolor=bg_color,
                    penwidth="1", tooltip=act, color=color,
                    style=f"filled,rounded,{style}", margin=margin)
            activities_map[act] = str(hash(act))
    
    if start_activities is None:
        start_activities = []
    if end_activities is None:
        end_activities = []

    filename = NamedTemporaryFile(suffix='.gv')
    viz = Digraph("", filename=filename.name, engine='dot',
                  graph_attr = { 'bgcolor': bgcolor })
     
    activities_in_dfg = set()

    for edge in freq_dfg:
        activities_in_dfg.add(edge[0])
        activities_in_dfg.add(edge[1])

    viz.attr('node', shape='box')
    start_activities_to_include = []
    end_activities_to_include = []
    if len(activities_in_dfg) == 0:
        activities_to_include = sorted(list(set(activities_count)))
    else:
        activities_to_include = sorted(list(set(activities_in_dfg)))

    for act in start_activities:
        if act in activities_to_include:
            start_activities_to_include.append(act)
            activities_to_include.remove(act)
    for act in end_activities:
        if act in activities_to_include:
            end_activities_to_include.append(act)
            activities_to_include.remove(act)
    
    filtered_soj_time = { key: value for key, value in
                          activities_count.items()
                          if key in activities_to_include }

    activities_color = get_activities_color_soj_time(
        filtered_soj_time, BLUE_COLORS)
    edges_color = get_edges_color_soj_time(freq_dfg)

    activities_map = {}

    top_graph = Digraph()
    top_graph.attr(rank="source")
    create_nodes(top_graph, activities_count, start_activities_to_include,
                 activities_color, activities_map)
    viz.subgraph(top_graph)
        

    bottom_graph = Digraph()
    bottom_graph.attr(rank="sink")
    create_nodes(bottom_graph, activities_count, end_activities_to_include, 
                 activities_color, activities_map)
    viz.subgraph(bottom_graph)
    
    create_nodes(viz, activities_count, activities_to_include, 
                 activities_color, activities_map)
    
    dfg_edges = sorted(list(freq_dfg.keys()))

    # represent edges
    for edge in dfg_edges:
        performance = human_readable_stat(perf_dfg[edge])
        label, style = f" {performance} ", "bold"

        color = edges_color.get(edge, BLACK_COLOR)
        tooltip = f"{edge[0]} -> {edge[1]}"

        color = BLACK_COLOR
        label = f" {freq_dfg[edge]} "

        viz.edge(str(hash(edge[0])), str(hash(edge[1])), label = label,
                style = style, fontsize = font_size, penwidth = "1",
                color = color, tooltip = tooltip, labeltooltip = tooltip)

    viz.attr(overlap='false')
    viz.attr(fontsize='11')
    viz.format = image_format

    return viz

def dfg_visualizer(freq_dfg: Dict[Tuple[str, str], int], log: DataFrame = None,
                   start_activities: list=[], end_activities: list=[]) -> Digraph:
    """
    Visualize a performance directly-follows graph
    Returns
    -----------------
    gviz
        Graphviz digraph
    """
    activity_key = xes.DEFAULT_NAME_KEY
    perf_dfg, _, _ = discover_performance_dfg(log)
    activities = dfg_utils.get_activities_from_dfg(freq_dfg)

    activities_count = None
    if activities_count is None:
        if log is not None:
            activities_count = attr_get.get_attribute_values(
                log, activity_key)
        else:
            activities_count = Counter({key: 0 for key in activities})
            for el in freq_dfg:
                activities_count[el[1]] += freq_dfg[el]
            if isinstance(start_activities, dict):
                for act in start_activities:
                    activities_count[act] += start_activities[act]

    return graphviz_visualization(activities_count, freq_dfg, perf_dfg, 
                                  start_activities=start_activities, 
                                  end_activities=end_activities,
                                  bgcolor="transparent",
                                  image_format="svg",
                                  font_size="12")
