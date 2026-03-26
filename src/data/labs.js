// ============================================================
// LABS DATA — 15 labs từ cơ bản đến nâng cao
// ============================================================

export const LABS = [
  // ─── NHÓM 1: CƠ BẢN ────────────────────────────────────
  {
    id:'l1', group:'Cơ bản', groupColor:'#00e676',
    title:'Lab 1: Cài đặt Mininet', diff:'easy', time:'30 phút',
    obj:'Cài đặt Mininet trên Ubuntu và kiểm tra hoạt động cơ bản.',
    theory:`Mininet dùng Linux Network Namespaces và Open vSwitch để mô phỏng mạng thực trên 1 máy. Mỗi host là 1 process cô lập, switch là OVS instance.`,
    steps:[
      { t:'Cập nhật hệ thống', lang:'bash', info:'Trước khi cài, cập nhật package list:', code:`sudo apt-get update && sudo apt-get upgrade -y` },
      { t:'Cài Mininet', lang:'bash', info:'Cài từ Ubuntu repository (khuyến nghị):', code:`sudo apt-get install mininet -y
mn --version
# Kết quả: 2.3.x hoặc cao hơn` },
      { t:'Cài Open vSwitch', lang:'bash', info:'OVS là software switch cần thiết:', code:`sudo apt-get install openvswitch-switch -y
sudo systemctl start openvswitch-switch
sudo systemctl enable openvswitch-switch
sudo ovs-vsctl show` },
      { t:'Test cơ bản', lang:'bash', info:'Chạy test pingall — mạng mặc định 1 switch 2 host:', code:`sudo mn --test pingall
# Expected: *** Results: 0% dropped (2/2 received)` },
      { t:'Dọn dẹp', lang:'bash', info:'LUÔN chạy sau mỗi session để xóa network state:', code:`sudo mn -c
# Clears: OVS bridges, veth pairs, namespaces` },
    ],
    expect:`*** Results: 0% dropped (2/2 received)\n*** Done`,
    tips:['Lỗi RTNETLINK: chạy sudo mn -c trước','OVS phải đang running: sudo service openvswitch-switch start','Cần quyền sudo để tạo network namespaces'],
    verify:[
      { q:'Mininet version?', cmd:'mn --version' },
      { q:'OVS đang chạy?', cmd:'sudo ovs-vsctl show' },
    ]
  },

  {
    id:'l2', group:'Cơ bản', groupColor:'#00e676',
    title:'Lab 2: CLI Mininet cơ bản', diff:'easy', time:'45 phút',
    obj:'Sử dụng thành thạo Mininet CLI để kiểm tra và debug mạng.',
    theory:`Mininet CLI cho phép chạy lệnh trực tiếp trên từng node (host/switch/controller). Cú pháp: nodeName command hoặc sh command để chạy trên host OS.`,
    steps:[
      { t:'Khởi động topology', lang:'bash', info:'Linear 4 switch với auto MAC:', code:`sudo mn --topo linear,4 --mac
# Tạo: c0 → s1-s2-s3-s4, mỗi switch 1 host` },
      { t:'Khám phá topology', lang:'bash', info:'Xem cấu trúc mạng:', code:`mininet> nodes
# c0 h1 h2 h3 h4 s1 s2 s3 s4

mininet> net
# h1 h1-eth0:s1-eth1
# s1 lo:  s1-eth1:h1-eth0  s1-eth2:s2-eth1

mininet> dump
# <Host h1: h1-eth0:10.0.0.1 pid=1234>
# <OVSSwitch s1: lo:127.0.0.1,s1-eth1:None pid=1235>` },
      { t:'Test kết nối', lang:'bash', info:'Ping giữa các host:', code:`mininet> pingall
# Ping: testing ping reachability
# h1 -> h2 h3 h4
# Results: 0% dropped

mininet> h1 ping -c 3 h4
# Round trip: ~0.5ms` },
      { t:'Đo bandwidth', lang:'bash', info:'iperf built-in của Mininet:', code:`mininet> iperf h1 h4
# iperf: TCP bandwidth: h1 <-> h4
# Results: 9.18 Gbits/sec` },
      { t:'Xem flow table', lang:'bash', info:'Các flow entry trong switch:', code:`mininet> sh ovs-ofctl dump-flows s1
# cookie=0x0, table=0, priority=0 actions=FLOOD
# cookie=0x0, table=0, n_packets=10 dl_dst=00:00:00:00:00:01 actions=output:1` },
      { t:'Chạy lệnh trên host', lang:'bash', info:'Host chạy thực sự như Linux box:', code:`mininet> h1 ifconfig
mininet> h1 ip addr
mininet> h1 cat /etc/hosts
mininet> h1 python3 -c "import socket; print(socket.gethostname())"` },
    ],
    expect:`*** Results: 0% dropped (12/12 received)`,
    tips:['Tab auto-complete tên node','Ctrl+C dừng lệnh đang chạy','py expr để evaluate Python expression trong CLI','help để xem tất cả commands'],
    verify:[
      { q:'Có bao nhiêu hosts?', cmd:'mininet> nodes' },
      { q:'Ping h1→h4 thành công?', cmd:'mininet> h1 ping -c 1 h4' },
    ]
  },

  {
    id:'l3', group:'Cơ bản', groupColor:'#00e676',
    title:'Lab 3: Topology tùy chỉnh', diff:'easy', time:'60 phút',
    obj:'Tạo topology mạng tùy chỉnh bằng Mininet CLI options.',
    theory:`Mininet cung cấp nhiều topology built-in: single, linear, tree, torus. Có thể customize với --topo, --link, --switch, --controller flags.`,
    steps:[
      { t:'Single switch', lang:'bash', info:'1 switch nhiều host:', code:`# 1 switch, 5 hosts
sudo mn --topo single,5
mininet> pingall` },
      { t:'Tree topology', lang:'bash', info:'Cây phân cấp:', code:`# Tree depth=2, fanout=3 → 9 hosts
sudo mn --topo tree,2,3
mininet> pingall

# Tree depth=3, fanout=2 → 8 hosts
sudo mn --topo tree,3,2` },
      { t:'Linear topology', lang:'bash', info:'Switch nối tiếp:', code:`# 5 switch, mỗi switch 1 host
sudo mn --topo linear,5
mininet> pingall
# Lưu ý: cần controller learning để ping được` },
      { t:'Link với QoS', lang:'bash', info:'Cấu hình bandwidth và delay:', code:`# 10Mbps bandwidth, 10ms delay, 1% packet loss
sudo mn --link tc,bw=10,delay=10ms,loss=1
mininet> h1 ping -c 5 h2
# Round trip ~ 20ms (2 x 10ms)
mininet> iperf h1 h2
# ~9.5 Mbits/sec (10Mbps - overhead)` },
      { t:'Remote controller', lang:'bash', info:'Kết nối với external controller:', code:`# Chạy controller ngoài trước (ví dụ POX)
sudo mn --controller=remote,ip=127.0.0.1,port=6633
# Hoặc dùng ovs-controller built-in
sudo mn --controller=ovs` },
      { t:'Verbose logging', lang:'bash', info:'Debug với log chi tiết:', code:`sudo mn --verbosity=debug --topo single,2
# Thấy: namespace creation, link setup, OVS config` },
    ],
    expect:`Tree(2,3): *** Results: 0% dropped (72/72 received)`,
    tips:['--mac giúp MAC address dễ đọc (00:00:00:00:00:01)','--arp pre-populate ARP table, không cần ARP flood','--switch ovs,protocols=OpenFlow13 cho OF 1.3'],
    verify:[
      { q:'Tree(2,3) pingall 0%?', cmd:'sudo mn --topo tree,2,3 --test pingall' },
      { q:'Link delay 20ms?', cmd:'mininet> h1 ping -c 3 h2' },
    ]
  },

  // ─── NHÓM 2: TRUNG CẤP ──────────────────────────────────
  {
    id:'l4', group:'Trung cấp', groupColor:'#00d4ff',
    title:'Lab 4: Python API — Topology', diff:'medium', time:'75 phút',
    obj:'Xây dựng topology tùy chỉnh bằng Mininet Python API.',
    theory:`Python API cho phép tạo topology phức tạp, cấu hình chi tiết từng link/host, và tích hợp logic tự động hóa. Class Topo là nền tảng để define topology.`,
    steps:[
      { t:'Topo cơ bản', lang:'python', info:'Tạo file custom_topo.py:', code:`#!/usr/bin/env python3
from mininet.net import Mininet
from mininet.node import Controller, OVSSwitch
from mininet.link import TCLink
from mininet.log import setLogLevel, info
from mininet.cli import CLI
from mininet.topo import Topo

class MyTopo(Topo):
    def build(self):
        # 2 switch kết nối nhau
        s1 = self.addSwitch('s1')
        s2 = self.addSwitch('s2')
        # 4 host, 2 host mỗi switch
        for i in range(1, 3):
            h = self.addHost(f'h{i}', ip=f'10.0.1.{i}/24')
            self.addLink(h, s1, bw=100, delay='2ms')
        for i in range(3, 5):
            h = self.addHost(f'h{i}', ip=f'10.0.2.{i-2}/24')
            self.addLink(h, s2, bw=100, delay='2ms')
        # Link giữa 2 switch
        self.addLink(s1, s2, bw=1000, delay='1ms')

if __name__ == '__main__':
    setLogLevel('info')
    topo = MyTopo()
    net = Mininet(topo=topo, link=TCLink, autoSetMacs=True)
    net.start()
    info('*** Testing connectivity\\n')
    net.pingAll()
    CLI(net)
    net.stop()` },
      { t:'Chạy và verify', lang:'bash', info:'Cấp quyền và chạy:', code:`chmod +x custom_topo.py
sudo python3 custom_topo.py
mininet> pingall
mininet> iperf h1 h3` },
      { t:'Data center topology', lang:'python', info:'Fat Tree 2-tier:', code:`class DataCenterTopo(Topo):
    """2-tier DC: 2 core, 4 edge, 12 hosts"""
    def build(self):
        cores = [self.addSwitch(f'c{i}') for i in range(1,3)]
        edges = [self.addSwitch(f'e{i}') for i in range(1,5)]
        # Core — Edge links (full mesh)
        for c in cores:
            for e in edges:
                self.addLink(c, e, bw=10000)  # 10Gbps
        # Edge — Host links
        hid = 1
        for e in edges:
            for _ in range(3):
                h = self.addHost(f'h{hid}',
                    ip=f'10.0.{hid//10}.{hid%10}/24')
                self.addLink(h, e, bw=1000)   # 1Gbps
                hid += 1` },
      { t:'Chạy DC topology', lang:'bash', info:'Test data center:', code:`sudo python3 -c "
from custom_topo import DataCenterTopo
from mininet.net import Mininet
from mininet.link import TCLink
net = Mininet(topo=DataCenterTopo(), link=TCLink, autoSetMacs=True)
net.start()
net.pingAll()
net.stop()
"` },
    ],
    expect:`*** Results: 0% dropped (12/12 received)`,
    tips:['autoSetMacs=True tránh xung đột MAC','TCLink cần kernel module sch_htb','info() thay print() để log đúng chuẩn Mininet'],
    verify:[
      { q:'2-switch topo pingall?', cmd:'sudo python3 custom_topo.py' },
      { q:'bandwidth h1-h3 đạt 100Mbps?', cmd:'mininet> iperf h1 h3' },
    ]
  },

  {
    id:'l5', group:'Trung cấp', groupColor:'#00d4ff',
    title:'Lab 5: Python API — Automation', diff:'medium', time:'90 phút',
    obj:'Tự động hóa đo lường hiệu suất mạng với Python API.',
    theory:`Mininet Python API cho phép chạy lệnh trên host, đo RTT, bandwidth và tự động tạo báo cáo. Dùng host.cmd() để chạy lệnh shell, waitOutput() chờ kết quả.`,
    steps:[
      { t:'RTT Matrix script', lang:'python', info:'Đo ping giữa tất cả hosts:', code:`#!/usr/bin/env python3
from mininet.net import Mininet
from mininet.topo import SingleSwitchTopo
from mininet.log import setLogLevel
import re, sys

def rtt_matrix(n=4):
    topo = SingleSwitchTopo(n=n)
    net = Mininet(topo=topo, autoSetMacs=True)
    net.start()
    hosts = net.hosts
    print(f"\\n{'':10s}" + ''.join(f"{h.name:10s}" for h in hosts))
    for src in hosts:
        row = f"{src.name:10s}"
        for dst in hosts:
            if src == dst:
                row += f"{'---':10s}"
            else:
                out = src.cmd(f'ping -c 3 -q {dst.IP()}')
                m = re.search(r'rtt.*?= ([\d.]+)/', out)
                rtt = f"{m.group(1)}ms" if m else "N/A"
                row += f"{rtt:10s}"
        print(row)
    net.stop()

if __name__ == '__main__':
    setLogLevel('warning')
    rtt_matrix()` },
      { t:'Bandwidth matrix', lang:'python', info:'Đo iperf giữa các cặp host:', code:`def bw_matrix(n=3):
    from mininet.net import Mininet
    from mininet.topo import SingleSwitchTopo
    net = Mininet(topo=SingleSwitchTopo(n=n), autoSetMacs=True)
    net.start()
    hosts = net.hosts
    results = {}
    for i, src in enumerate(hosts):
        for j, dst in enumerate(hosts):
            if i >= j: continue
            # Start iperf server
            dst.cmd('iperf3 -s -D --one-off')
            import time; time.sleep(0.5)
            # Run client
            out = src.cmd(f'iperf3 -c {dst.IP()} -t 5 -J 2>/dev/null')
            import json
            try:
                data = json.loads(out)
                bw = data['end']['sum_received']['bits_per_second']/1e6
                results[f'{src.name}-{dst.name}'] = f'{bw:.1f} Mbps'
            except:
                results[f'{src.name}-{dst.name}'] = 'N/A'
    net.stop()
    for k, v in results.items():
        print(f"  {k}: {v}")` },
      { t:'Packet loss test', lang:'python', info:'Đo packet loss với loss link:', code:`from mininet.net import Mininet
from mininet.topo import Topo
from mininet.link import TCLink

class LossyTopo(Topo):
    def build(self):
        s1 = self.addSwitch('s1')
        h1 = self.addHost('h1')
        h2 = self.addHost('h2')
        self.addLink(h1, s1, loss=5)   # 5% loss
        self.addLink(h2, s1, loss=0)

net = Mininet(topo=LossyTopo(), link=TCLink, autoSetMacs=True)
net.start()
h1, h2 = net.get('h1', 'h2')
# Ping 100 packets, check loss%
out = h1.cmd(f'ping -c 100 -q {h2.IP()}')
print(out.split('\\n')[-3])   # packet loss line
net.stop()` },
      { t:'Chạy automation', lang:'bash', info:'', code:`sudo python3 rtt_matrix.py
sudo python3 bw_matrix.py` },
    ],
    expect:`h1: h2=0.45ms h3=0.48ms h4=0.51ms\nh2: h1=0.45ms h3=0.42ms h4=0.49ms`,
    tips:["setLogLevel('warning') giảm noise","host.cmd() chạy đồng bộ, chờ kết quả","host.sendCmd() + waitOutput() = async","Dùng -q flag với ping để output gọn"],
    verify:[
      { q:'RTT < 1ms giữa 2 host?', cmd:'sudo python3 rtt_matrix.py' },
      { q:'Packet loss với lossy link?', cmd:'sudo python3 loss_test.py' },
    ]
  },

  {
    id:'l6', group:'Trung cấp', groupColor:'#00d4ff',
    title:'Lab 6: QoS & Traffic Control', diff:'medium', time:'90 phút',
    obj:'Cấu hình QoS, bandwidth limiting và traffic shaping với TCLink.',
    theory:`Traffic Control (TC) trong Linux dùng qdisc (queuing discipline) để control traffic. HTB (Hierarchical Token Bucket) cho phép bandwidth guarantee và ceiling. Mininet TCLink wrap TC commands.`,
    steps:[
      { t:'TCLink cơ bản', lang:'bash', info:'Set bandwidth và delay:', code:`# 10Mbps, 10ms delay, 1% loss
sudo mn --topo single,3 --link tc,bw=10,delay=10ms,loss=1
mininet> h1 ping -c 5 h2     # ~20ms RTT
mininet> iperf h1 h2          # ~9.5 Mbps` },
      { t:'Asymmetric links', lang:'python', info:'Upload/download bandwidth khác nhau:', code:`from mininet.net import Mininet
from mininet.link import TCLink
from mininet.topo import Topo

class AsymTopo(Topo):
    def build(self):
        s1 = self.addSwitch('s1')
        h1 = self.addHost('h1')
        h2 = self.addHost('h2')
        # h1: upload 10Mbps, download 100Mbps
        self.addLink(h1, s1,
            params1={'bw':10, 'delay':'5ms'},   # h1→switch
            params2={'bw':100, 'delay':'5ms'})  # switch→h1

net = Mininet(topo=AsymTopo(), link=TCLink, autoSetMacs=True)
net.start()
h1, h2 = net.get('h1','h2')
# Test upload (h1→h2)
h2.cmd('iperf3 -s -D --one-off')
print('Upload:', h1.cmd(f'iperf3 -c {h2.IP()} -t 5'))
net.stop()` },
      { t:'HTB Queue priorities', lang:'python', info:'Priority queuing với OVS:', code:`# Cài đặt OVS QoS
# 3 queue: high(8Mbps), medium(5Mbps), low(2Mbps)
import subprocess

def setup_qos():
    # Tạo QoS với 3 queue trên interface s1-eth1
    cmds = [
        'ovs-vsctl set port s1-eth1 qos=@newqos -- '
        '--id=@newqos create qos type=linux-htb '
        'queues=0=@q0,1=@q1,2=@q2 -- '
        '--id=@q0 create queue other-config:max-rate=8000000 -- '
        '--id=@q1 create queue other-config:max-rate=5000000 -- '
        '--id=@q2 create queue other-config:max-rate=2000000',
    ]
    for cmd in cmds:
        subprocess.run(['sudo', 'ovs-vsctl'] + cmd.split()[1:])

setup_qos()
print("QoS configured")` },
      { t:'iperf3 test', lang:'bash', info:'Đo bandwidth với nhiều luồng:', code:`# TCP throughput
mininet> h1 iperf3 -s &
mininet> h2 iperf3 -c 10.0.0.1 -t 30 -i 5

# UDP test với target 50Mbps
mininet> h2 iperf3 -c 10.0.0.1 -u -b 50M -t 30

# Parallel streams
mininet> h2 iperf3 -c 10.0.0.1 -P 4 -t 30` },
      { t:'tcpdump analysis', lang:'bash', info:'Capture và phân tích traffic:', code:`# Capture trên host h1
mininet> h1 tcpdump -i h1-eth0 -w /tmp/capture.pcap &
mininet> h2 ping -c 20 h1

# Xem capture
mininet> h1 tcpdump -r /tmp/capture.pcap
# Hoặc mở Wireshark (nếu có GUI):
wireshark /tmp/capture.pcap` },
    ],
    expect:`TCP: 9.5 Mbits/sec (10Mbps link)\nRTT: ~20ms (2×10ms delay)`,
    tips:['bw tính bằng Mbps trong TCLink','delay="10ms" hoặc delay=10ms (ms đơn vị)','Delay 2 chiều: mỗi link thêm 1 chiều delay → RTT = 2x','Loss=1 nghĩa là 1% packet loss mỗi chiều'],
    verify:[
      { q:'Bandwidth đúng 10Mbps?', cmd:'mininet> iperf h1 h2' },
      { q:'RTT đúng 20ms với delay=10ms?', cmd:'mininet> h1 ping -c 3 h2' },
    ]
  },

  {
    id:'l7', group:'Trung cấp', groupColor:'#00d4ff',
    title:'Lab 7: OVS & OpenFlow thủ công', diff:'medium', time:'90 phút',
    obj:'Cấu hình OpenFlow flow entries thủ công với ovs-ofctl.',
    theory:`ovs-ofctl là công cụ quản lý OVS switches trực tiếp. Có thể add/delete/modify flow entries, dump port stats, và monitor packet processing — không cần controller.`,
    steps:[
      { t:'Setup và disable controller', lang:'bash', info:'Tạo mạng không có controller học:', code:`# Tạo mạng, tắt default learning
sudo mn --topo single,3 --controller none --mac
mininet> sh ovs-vsctl show

# Lúc này không có flow → ping thất bại
mininet> h1 ping -c 1 h2   # fail` },
      { t:'Thêm flow thủ công', lang:'bash', info:'Cài flow entries cho phép ping:', code:`# Cho phép ARP broadcast
mininet> sh ovs-ofctl add-flow s1 "priority=1,arp,actions=flood"

# Cho phép ICMP (ping) giữa h1 và h2
mininet> sh ovs-ofctl add-flow s1 \
  "priority=10,icmp,nw_src=10.0.0.1,nw_dst=10.0.0.2,actions=output:2"
mininet> sh ovs-ofctl add-flow s1 \
  "priority=10,icmp,nw_src=10.0.0.2,nw_dst=10.0.0.1,actions=output:1"

# Test
mininet> h1 ping -c 3 h2   # success!
mininet> h1 ping -c 1 h3   # fail — không có flow cho h3` },
      { t:'Block traffic', lang:'bash', info:'Chặn một loại traffic:', code:`# Chặn ping từ h2 đến h1 (one-way block)
mininet> sh ovs-ofctl add-flow s1 \
  "priority=100,icmp,nw_src=10.0.0.2,nw_dst=10.0.0.1,actions=drop"

# h1 ping h2 thành công
mininet> h1 ping -c 2 h2
# h2 ping h1 thất bại (bị drop)
mininet> h2 ping -c 2 h1` },
      { t:'Dump và monitor', lang:'bash', info:'Xem flow statistics:', code:`# Xem tất cả flow entries
mininet> sh ovs-ofctl dump-flows s1

# Xem port statistics
mininet> sh ovs-ofctl dump-ports s1

# Monitor packet-in events real-time
mininet> sh ovs-ofctl monitor s1 &
mininet> h1 ping -c 3 h2
# Thấy packet processing events` },
      { t:'L2 forwarding table', lang:'bash', info:'Cài đầy đủ L2 forwarding:', code:`# Giả sử: h1=port1, h2=port2, h3=port3
# Cài flow cho mỗi cặp
for src in 1 2 3; do
  for dst in 1 2 3; do
    if [ $src != $dst ]; then
      sudo ovs-ofctl add-flow s1 \
        "priority=5,dl_dst=00:00:00:00:00:0${dst},actions=output:${dst}"
    fi
  done
done
echo "L2 table configured"
mininet> pingall   # 0% dropped` },
    ],
    expect:`Flow dump shows:\ncookie=0x0 priority=10 icmp actions=output:2\nPing h1→h2: 0% loss`,
    tips:['in_port thường là port number trong OVS','dl_dst = destination MAC address','priority cao hơn = match trước','delete-flows để xóa: ovs-ofctl del-flows s1'],
    verify:[
      { q:'Flow entries đã cài?', cmd:'mininet> sh ovs-ofctl dump-flows s1' },
      { q:'Ping sau khi cài flow?', cmd:'mininet> h1 ping -c 3 h2' },
    ]
  },

  // ─── NHÓM 3: SDN CONTROLLER ─────────────────────────────
  {
    id:'l8', group:'SDN Controller', groupColor:'#c792ea',
    title:'Lab 8: Ryu L2 Switch', diff:'hard', time:'90 phút',
    obj:'Viết Ryu controller L2 learning switch hoàn chỉnh.',
    theory:`Ryu là Python SDN framework. Mỗi Ryu app xử lý OpenFlow events. EventOFPPacketIn: packet không match flow → controller quyết định. Learning switch xây MAC table, unicast khi biết MAC, flood khi chưa biết.`,
    steps:[
      { t:'Cài Ryu', lang:'bash', info:'', code:`sudo pip3 install ryu
ryu-manager --version` },
      { t:'simple_switch.py', lang:'python', info:'L2 learning switch chuẩn:', code:`from ryu.base import app_manager
from ryu.controller import ofp_event
from ryu.controller.handler import (CONFIG_DISPATCHER,
    MAIN_DISPATCHER, set_ev_cls)
from ryu.ofproto import ofproto_v1_3
from ryu.lib.packet import packet, ethernet, ether_types

class SimpleSwitch13(app_manager.RyuApp):
    OFP_VERSIONS = [ofproto_v1_3.OFP_VERSION]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.mac_to_port = {}  # {dpid: {mac: port}}

    @set_ev_cls(ofp_event.EventOFPSwitchFeatures,
                CONFIG_DISPATCHER)
    def switch_features_handler(self, ev):
        """Cài table-miss flow: gửi lên controller"""
        dp = ev.msg.datapath
        ofp = dp.ofproto
        parser = dp.ofproto_parser
        match = parser.OFPMatch()
        actions = [parser.OFPActionOutput(
            ofp.OFPP_CONTROLLER, ofp.OFPCML_NO_BUFFER)]
        inst = [parser.OFPInstructionActions(
            ofp.OFPIT_APPLY_ACTIONS, actions)]
        dp.send_msg(parser.OFPFlowMod(
            datapath=dp, priority=0,
            match=match, instructions=inst))

    @set_ev_cls(ofp_event.EventOFPPacketIn,
                MAIN_DISPATCHER)
    def packet_in_handler(self, ev):
        msg = ev.msg
        dp = msg.datapath
        ofp = dp.ofproto
        parser = dp.ofproto_parser
        in_port = msg.match['in_port']

        pkt = packet.Packet(msg.data)
        eth = pkt.get_protocols(ethernet.ethernet)[0]
        if eth.ethertype == ether_types.ETH_TYPE_LLDP:
            return

        dst, src = eth.dst, eth.src
        dpid = dp.id

        # Learning: ghi nhớ src MAC → in_port
        self.mac_to_port.setdefault(dpid, {})
        self.mac_to_port[dpid][src] = in_port
        self.logger.info("Learn: dpid=%s %s→port%s",
                         dpid, src, in_port)

        # Forwarding: biết dst MAC → unicast, không → flood
        out_port = self.mac_to_port[dpid].get(
            dst, ofp.OFPP_FLOOD)

        actions = [parser.OFPActionOutput(out_port)]

        # Cài flow nếu biết out_port
        if out_port != ofp.OFPP_FLOOD:
            match = parser.OFPMatch(
                in_port=in_port,
                eth_dst=dst, eth_src=src)
            inst = [parser.OFPInstructionActions(
                ofp.OFPIT_APPLY_ACTIONS, actions)]
            dp.send_msg(parser.OFPFlowMod(
                datapath=dp,
                priority=1,
                idle_timeout=60,
                hard_timeout=300,
                match=match,
                instructions=inst))

        # Packet-Out
        data = (msg.data
                if msg.buffer_id == ofp.OFP_NO_BUFFER
                else None)
        dp.send_msg(parser.OFPPacketOut(
            datapath=dp,
            buffer_id=msg.buffer_id,
            in_port=in_port,
            actions=actions,
            data=data))` },
      { t:'Chạy Ryu + Mininet', lang:'bash', info:'2 terminal cùng lúc:', code:`# === Terminal 1: Ryu controller ===
ryu-manager simple_switch.py
# Thấy: loading app simple_switch.py
# Thấy: instantiating app ryu.controller.ofp_handler

# === Terminal 2: Mininet ===
sudo mn --controller=remote,ip=127.0.0.1,port=6653 \
        --switch ovs,protocols=OpenFlow13 \
        --topo single,3 --mac
mininet> pingall
# Lần đầu: flood, controller học MAC
# Lần 2: unicast, flow đã cài

mininet> sh ovs-ofctl dump-flows s1
# Thấy flow entries với in_port, eth_dst` },
      { t:'Verify learning', lang:'bash', info:'Quan sát Ryu log:', code:`# Trong Ryu terminal thấy:
# packet in 1 00:00:00:00:00:01 -> 00:00:00:00:00:02 1
# packet in 1 00:00:00:00:00:02 -> 00:00:00:00:00:01 2
# (sau đó unicast, không có packet in nữa)

# Xem flow table sau pingall
mininet> sh ovs-ofctl dump-flows s1
# idle_timeout=60 cho phép flow expire khi không dùng` },
    ],
    expect:`mininet> pingall\n*** Results: 0% dropped (6/6 received)\nRyu log: Learning MAC entries`,
    tips:['Khởi động Ryu TRƯỚC Mininet','port 6653 = OpenFlow 1.3, port 6633 = OF 1.0','idle_timeout xóa flow khi không có traffic','Ctrl+C dừng Ryu, sudo mn -c dọn Mininet'],
    verify:[
      { q:'Ryu chạy ở port 6653?', cmd:'sudo netstat -tlnp | grep 6653' },
      { q:'pingall 0% sau Ryu?', cmd:'mininet> pingall' },
    ]
  },

  {
    id:'l9', group:'SDN Controller', groupColor:'#c792ea',
    title:'Lab 9: Ryu Firewall ACL', diff:'hard', time:'120 phút',
    obj:'Xây dựng SDN Firewall với Access Control List dùng Ryu.',
    theory:`SDN Firewall dùng flow priority để implement allow/deny rules. Priority cao hơn match trước — deny rule cần priority > allow rule. Controller cài flow entries tĩnh khi switch connect, không cần packet-in cho mỗi packet.`,
    steps:[
      { t:'ACL policy design', lang:'python', info:'Thiết kế chính sách firewall:', code:`# Chính sách ACL:
# VLAN 10 (10.0.1.x): Sinh viên — chỉ được HTTP/HTTPS
# VLAN 20 (10.0.2.x): Giảng viên — toàn quyền
# Rule priority: deny > allow > default

ACL = [
    # priority, match, action
    # Default: allow all
    (1,  {}, 'allow'),
    # Block: sinh viên không SSH (port 22)
    (100, {'ip_proto':6, 'tcp_dst':22,
           'ipv4_src': '10.0.1.0/24'}, 'deny'),
    # Block: sinh viên không Telnet
    (100, {'ip_proto':6, 'tcp_dst':23,
           'ipv4_src': '10.0.1.0/24'}, 'deny'),
    # Allow: giảng viên full access
    (50,  {'ipv4_src': '10.0.2.0/24'}, 'allow'),
]` },
      { t:'Ryu Firewall App', lang:'python', info:'fw_app.py — Firewall controller:', code:`from ryu.base import app_manager
from ryu.controller import ofp_event
from ryu.controller.handler import (CONFIG_DISPATCHER, set_ev_cls)
from ryu.ofproto import ofproto_v1_3
from ryu.lib.packet import packet, ethernet, ether_types

class FirewallApp(app_manager.RyuApp):
    OFP_VERSIONS = [ofproto_v1_3.OFP_VERSION]

    # Static ACL rules: (priority, match_dict, action)
    ACL = [
        (1,   {}, 'allow'),   # default allow
        (100, {'ip_proto':6, 'eth_type':0x800,
               'tcp_dst':22}, 'deny'),   # block SSH
        (100, {'ip_proto':6, 'eth_type':0x800,
               'tcp_dst':23}, 'deny'),   # block Telnet
        (100, {'ip_proto':17, 'eth_type':0x800,
               'udp_dst':53}, 'allow'),  # allow DNS
    ]

    @set_ev_cls(ofp_event.EventOFPSwitchFeatures,
                CONFIG_DISPATCHER)
    def features_handler(self, ev):
        dp = ev.msg.datapath
        parser = dp.ofproto_parser
        ofp = dp.ofproto
        self.logger.info("Switch %s connected", dp.id)

        # Cài ACL rules
        for priority, match_dict, action in self.ACL:
            match = parser.OFPMatch(**match_dict)
            if action == 'allow':
                acts = [parser.OFPActionOutput(ofp.OFPP_NORMAL)]
                inst = [parser.OFPInstructionActions(
                    ofp.OFPIT_APPLY_ACTIONS, acts)]
            else:  # deny
                inst = []  # drop = no instructions

            dp.send_msg(parser.OFPFlowMod(
                datapath=dp,
                priority=priority,
                match=match,
                instructions=inst,
                command=ofp.OFPFC_ADD))
            self.logger.info("ACL: %s %s p=%d",
                             action, match_dict, priority)` },
      { t:'Test firewall', lang:'bash', info:'Verify ACL hoạt động:', code:`# Terminal 1: Ryu
ryu-manager fw_app.py

# Terminal 2: Mininet với 3 hosts
sudo mn --topo single,3 --mac \
        --controller=remote,ip=127.0.0.1,port=6653 \
        --switch ovs,protocols=OpenFlow13

# Test 1: ICMP ping — allowed
mininet> h1 ping -c 3 h2   # OK

# Test 2: Simulate SSH — blocked
mininet> h2 hping3 -S -p 22 -c 3 h1   # dropped

# Test 3: Xem flow entries
mininet> sh ovs-ofctl dump-flows s1
# Thấy: priority=100 tcp_dst=22 actions=drop` },
      { t:'Dynamic rule update', lang:'python', info:'Thêm/xóa rule qua REST:', code:`# Thêm vào fw_app.py: REST endpoint để update rule
from ryu.app.wsgi import ControllerBase, WSGIApplication
from webob import Response
import json

class FirewallREST(ControllerBase):
    def __init__(self, req, link, data, **config):
        super().__init__(req, link, data, **config)
        self.fw_app = data['fw_app']

    def add_rule(self, req, **kwargs):
        body = json.loads(req.body)
        # body = {"priority": 200, "match": {"tcp_dst": 80}, "action": "deny"}
        # ... cài flow vào tất cả switches
        return Response(json={'status': 'OK'})

# Sử dụng:
# curl -X POST http://localhost:8080/firewall/rules \
#      -d '{"priority":200,"match":{"tcp_dst":80},"action":"deny"}'` },
    ],
    expect:`ACL flows installed:\npriority=100 tcp_dst=22 actions=drop\nPing: OK, SSH: blocked`,
    tips:['Priority 0 = table-miss, priority cao nhất = match đầu tiên','Drop = instructions=[] (không có action)','OFPFC_ADD để thêm, OFPFC_DELETE để xóa flow','ip_proto: 6=TCP, 17=UDP, 1=ICMP'],
    verify:[
      { q:'ACL flows cài vào switch?', cmd:'mininet> sh ovs-ofctl dump-flows s1 | grep drop' },
      { q:'SSH bị block (port 22)?', cmd:'mininet> h1 hping3 -S -p 22 -c 3 h2' },
    ]
  },

  {
    id:'l10', group:'SDN Controller', groupColor:'#c792ea',
    title:'Lab 10: Ryu QoS Controller', diff:'hard', time:'120 phút',
    obj:'Implement QoS với bandwidth guarantee và traffic prioritization.',
    theory:`OpenFlow Meter (OF 1.3+) cho phép rate limiting trực tiếp trong switch. Kết hợp Queue và Meter để tạo hệ thống QoS đa tầng: guaranteed minimum bandwidth và hard maximum cap.`,
    steps:[
      { t:'OVS Queue setup', lang:'bash', info:'Tạo queue với bandwidth limits:', code:`# Tạo QoS policy trên switch port
sudo ovs-vsctl -- \\
  --id=@q0 create Queue other-config:min-rate=1000000 \\
             other-config:max-rate=8000000 -- \\
  --id=@q1 create Queue other-config:min-rate=5000000 \\
             other-config:max-rate=5000000 -- \\
  --id=@q2 create Queue other-config:min-rate=500000 \\
             other-config:max-rate=2000000 -- \\
  --id=@qos create QoS type=linux-htb \\
             queues=0=@q0,1=@q1,2=@q2 -- \\
  set Port s1-eth1 qos=@qos

# Verify
sudo ovs-vsctl list QoS
sudo ovs-vsctl list Queue` },
      { t:'Ryu QoS App', lang:'python', info:'qos_controller.py:', code:`from ryu.base import app_manager
from ryu.controller import ofp_event
from ryu.controller.handler import (CONFIG_DISPATCHER, set_ev_cls)
from ryu.ofproto import ofproto_v1_3

class QoSController(app_manager.RyuApp):
    OFP_VERSIONS = [ofproto_v1_3.OFP_VERSION]

    # QoS Policy: {dscp: queue_id}
    # DSCP 46 = Expedited Forwarding (real-time)
    # DSCP 0  = Best effort
    QOS_POLICY = {46: 0, 34: 1, 0: 2}

    @set_ev_cls(ofp_event.EventOFPSwitchFeatures,
                CONFIG_DISPATCHER)
    def features_handler(self, ev):
        dp = ev.msg.datapath
        parser = dp.ofproto_parser
        ofp = dp.ofproto

        # Cài Meter: rate limiting 10Mbps/host
        bands = [parser.OFPMeterBandDrop(
            rate=10000,   # 10 Mbps
            burst_size=1000)]
        dp.send_msg(parser.OFPMeterMod(
            datapath=dp,
            command=ofp.OFPMC_ADD,
            flags=ofp.OFPMF_KBPS,
            meter_id=1,
            bands=bands))

        # Flow: map DSCP → queue
        for dscp, queue_id in self.QOS_POLICY.items():
            if dscp > 0:
                match = parser.OFPMatch(
                    eth_type=0x800, ip_dscp=dscp)
            else:
                match = parser.OFPMatch(eth_type=0x800)

            actions = [
                parser.OFPActionSetQueue(queue_id),
                parser.OFPActionOutput(ofp.OFPP_NORMAL)
            ]
            inst = [
                parser.OFPInstructionActions(
                    ofp.OFPIT_APPLY_ACTIONS, actions),
                parser.OFPInstructionMeter(
                    meter_id=1,
                    type_=ofp.OFPIT_METER)
            ]
            dp.send_msg(parser.OFPFlowMod(
                datapath=dp,
                priority=dscp + 1,
                match=match,
                instructions=inst))` },
      { t:'Test QoS', lang:'bash', info:'Verify traffic shaping:', code:`# Đánh dấu DSCP cho traffic ưu tiên cao
mininet> h1 tc qdisc add dev h1-eth0 root dsfield
mininet> h1 iptables -t mangle -A OUTPUT \
              -p udp --dport 5001 -j DSCP --set-dscp 46

# Test: high priority UDP
mininet> h2 iperf3 -s &
mininet> h1 iperf3 -c 10.0.0.2 -u -b 20M -t 30
# Should be limited to queue 0 max rate (8Mbps)

# Test: best effort TCP
mininet> h1 iperf3 -c 10.0.0.2 -t 30
# Should get queue 2 (2Mbps max)` },
    ],
    expect:`High priority: ~8 Mbps (queue 0 max)\nBest effort: ~2 Mbps (queue 2 max)\nMeter limiting: per-host max 10 Mbps`,
    tips:['DSCP 46 = EF (Expedited Forwarding) cho VoIP/video','Meter dùng KBPS đơn vị','Queue priority: thấp hơn = ưu tiên hơn trong HTB','OVS cần reboot sau khi setup QoS nếu không nhận'],
    verify:[
      { q:'Meter 10Mbps cài vào switch?', cmd:'mininet> sh ovs-ofctl dump-meters s1' },
      { q:'Queue flows tồn tại?', cmd:'mininet> sh ovs-ofctl dump-flows s1 | grep queue' },
    ]
  },

  // ─── NHÓM 4: NÂNG CAO ───────────────────────────────────
  {
    id:'l11', group:'Nâng cao', groupColor:'#ffab40',
    title:'Lab 11: Fat Tree & ECMP', diff:'hard', time:'150 phút',
    obj:'Triển khai Fat Tree data center topology với ECMP load balancing.',
    theory:`Fat Tree là topology đảm bảo full bisection bandwidth trong DC. k=4: 4 core, 8 aggregation, 8 edge switches, 16 hosts. ECMP phân phối traffic đều trên nhiều đường bằng nhau để tối đa bandwidth.`,
    steps:[
      { t:'Fat Tree k=4', lang:'python', info:'fat_tree.py — full implementation:', code:`#!/usr/bin/env python3
from mininet.topo import Topo
from mininet.net import Mininet
from mininet.node import RemoteController, OVSSwitch
from mininet.link import TCLink
from mininet.cli import CLI
from mininet.log import setLogLevel, info

class FatTree(Topo):
    """Fat Tree topology, k=4
    16 hosts, 8 edge, 8 agg, 4 core switches
    """
    def build(self, k=4):
        half_k = k // 2
        # Core switches: (k/2)^2 = 4
        cores = []
        for i in range(half_k ** 2):
            s = self.addSwitch(f'c{i+1}',
                dpid=f'0000000000000{i+1:01x}')
            cores.append(s)

        pod_switches = []
        host_id = 1
        for pod in range(k):
            # Aggregation switches: k/2 per pod
            aggs = []
            for i in range(half_k):
                s = self.addSwitch(
                    f'a{pod}{i}',
                    dpid=f'00000000000{pod}{i}0')
                aggs.append(s)

            # Edge switches: k/2 per pod
            edges = []
            for i in range(half_k):
                s = self.addSwitch(
                    f'e{pod}{i}',
                    dpid=f'00000000000{pod}{i}1')
                edges.append(s)

                # Hosts per edge: k/2
                for j in range(half_k):
                    h = self.addHost(
                        f'h{host_id}',
                        ip=f'10.{pod}.{i}.{j+2}/24',
                        mac=f'00:00:00:{pod:02x}:{i:02x}:{j+2:02x}')
                    self.addLink(h, s, bw=1000)
                    host_id += 1

            # Edge — Aggregation links
            for e in edges:
                for a in aggs:
                    self.addLink(e, a, bw=10000)

            # Aggregation — Core links
            for i, a in enumerate(aggs):
                for j in range(half_k):
                    core_idx = i * half_k + j
                    self.addLink(a, cores[core_idx],
                                 bw=10000)
            pod_switches.extend(aggs + edges)

        info(f"Fat Tree k={k}: {k**3//4} hosts, "
             f"{k**2//4} core, {k**2//2} agg, "
             f"{k**2//2} edge switches\\n")

if __name__ == '__main__':
    setLogLevel('info')
    topo = FatTree(k=4)
    net = Mininet(topo=topo, link=TCLink,
                  controller=RemoteController,
                  switch=OVSSwitch,
                  autoSetMacs=False)
    net.addController('c0', ip='127.0.0.1', port=6653)
    net.start()
    net.pingAll()
    CLI(net)
    net.stop()` },
      { t:'ECMP Ryu Controller', lang:'python', info:'ecmp_ctrl.py — load balancing:', code:`from ryu.base import app_manager
from ryu.controller import ofp_event
from ryu.controller.handler import (CONFIG_DISPATCHER,
    MAIN_DISPATCHER, set_ev_cls)
from ryu.ofproto import ofproto_v1_3
from ryu.lib.packet import packet, ethernet, ipv4, ether_types
import struct

class ECMPController(app_manager.RyuApp):
    OFP_VERSIONS = [ofproto_v1_3.OFP_VERSION]

    def hash_5tuple(self, src_ip, dst_ip,
                     proto, src_port, dst_port):
        """Hash 5-tuple để chọn đường ECMP"""
        key = (struct.pack('!4sI',
               src_ip.encode(), src_port) +
               struct.pack('!4sI',
               dst_ip.encode(), dst_port) +
               bytes([proto]))
        return hash(key)

    def select_port(self, ports, flow_key):
        """Chọn output port dựa trên flow hash"""
        if not ports: return None
        return ports[self.hash_5tuple(*flow_key) % len(ports)]

    @set_ev_cls(ofp_event.EventOFPPacketIn,
                MAIN_DISPATCHER)
    def packet_in_handler(self, ev):
        msg = ev.msg
        dp = msg.datapath
        parser = dp.ofproto_parser
        ofp = dp.ofproto
        in_port = msg.match['in_port']

        pkt = packet.Packet(msg.data)
        eth = pkt.get_protocols(ethernet.ethernet)[0]
        ip_pkt = pkt.get_protocol(ipv4.ipv4)

        if ip_pkt:
            # Lấy danh sách port đến đích (simplified)
            # Trong thực tế: dùng routing table hoặc topology graph
            out_ports = self.get_ecmp_ports(
                dp.id, ip_pkt.dst)

            if out_ports:
                # Chọn port theo hash 5-tuple
                out = self.select_port(
                    out_ports,
                    (ip_pkt.src, ip_pkt.dst,
                     ip_pkt.proto, 0, 0))

                actions = [parser.OFPActionOutput(out)]
                # Cài flow với match 5-tuple
                match = parser.OFPMatch(
                    in_port=in_port,
                    eth_type=0x800,
                    ipv4_src=ip_pkt.src,
                    ipv4_dst=ip_pkt.dst)
                inst = [parser.OFPInstructionActions(
                    ofp.OFPIT_APPLY_ACTIONS, actions)]
                dp.send_msg(parser.OFPFlowMod(
                    datapath=dp, priority=10,
                    idle_timeout=30,
                    match=match, instructions=inst))

    def get_ecmp_ports(self, dpid, dst_ip):
        """Override: trả về danh sách ECMP ports"""
        # Implement: lookup routing table
        return []  # placeholder` },
      { t:'Benchmark', lang:'bash', info:'Đo bisection bandwidth:', code:`# Multiple parallel iperf streams
mininet> h1 iperf3 -s -D
mininet> h9 iperf3 -s -D  # pod đối diện

# Test bandwidth với 8 luồng song song
mininet> h2 iperf3 -c 10.0.0.2 -P 8 -t 30 -i 5
# ECMP: tổng ~4×10Gbps = 40Gbps (4 paths)
# Single path: ~10Gbps

# So sánh single vs ECMP
mininet> pingall` },
    ],
    expect:`Fat Tree k=4: 16 hosts connected\nECMP: 4 parallel paths available\nBisection BW: 4× single path`,
    tips:['k=4: 20 switches, 16 hosts — start small','ECMP dùng 5-tuple hash để giữ flow coherence','Fat Tree đảm bảo bisection BW = N/2 * link BW','Cần ECMP-aware controller — default controller không ECMP'],
    verify:[
      { q:'16 hosts kết nối được?', cmd:'mininet> pingall' },
      { q:'4 đường giữa 2 pod?', cmd:'mininet> sh ovs-ofctl dump-flows c1 | wc -l' },
    ]
  },

  {
    id:'l12', group:'Nâng cao', groupColor:'#ffab40',
    title:'Lab 12: Network Slicing với VLAN', diff:'hard', time:'120 phút',
    obj:'Triển khai network slicing cho multi-tenant với VLAN isolation.',
    theory:`Network Slicing tạo nhiều mạng ảo độc lập trên cùng hạ tầng vật lý. VLAN (802.1Q) cô lập L2 domain. OpenFlow match VLAN tag để forward đúng tenant.`,
    steps:[
      { t:'Multi-tenant topology', lang:'python', info:'3 tenant, cùng switch vật lý:', code:`from mininet.topo import Topo
from mininet.net import Mininet
from mininet.node import OVSSwitch, RemoteController

class MultiTenantTopo(Topo):
    """3 tenant chia sẻ 1 core switch"""
    def build(self):
        # Core switch (shared)
        core = self.addSwitch('s0')
        # 3 edge switch mỗi tenant
        for t in range(1, 4):
            edge = self.addSwitch(f's{t}')
            self.addLink(edge, core)
            # 2 host mỗi tenant
            for h in range(1, 3):
                host = self.addHost(
                    f'h{t}{h}',
                    ip=f'192.168.{t}.{h}/24',
                    mac=f'00:00:{t:02x}:00:00:{h:02x}')
                self.addLink(host, edge)` },
      { t:'VLAN Ryu Controller', lang:'python', info:'vlan_ctrl.py — VLAN isolation:', code:`from ryu.base import app_manager
from ryu.controller import ofp_event
from ryu.controller.handler import (CONFIG_DISPATCHER,
    MAIN_DISPATCHER, set_ev_cls)
from ryu.ofproto import ofproto_v1_3
from ryu.lib.packet import packet, ethernet, vlan

# Tenant → VLAN mapping
TENANT_VLAN = {
    'h11': 10, 'h12': 10,  # Tenant A → VLAN 10
    'h21': 20, 'h22': 20,  # Tenant B → VLAN 20
    'h31': 30, 'h32': 30,  # Tenant C → VLAN 30
}

class VLANController(app_manager.RyuApp):
    OFP_VERSIONS = [ofproto_v1_3.OFP_VERSION]

    @set_ev_cls(ofp_event.EventOFPSwitchFeatures,
                CONFIG_DISPATCHER)
    def features_handler(self, ev):
        dp = ev.msg.datapath
        parser = dp.ofproto_parser
        ofp = dp.ofproto

        # Rule 1: Tag VLAN khi vào từ host port
        for host, vid in TENANT_VLAN.items():
            # Giả sử port mapping đã biết
            port = self.host_to_port(host, dp.id)
            if port:
                # Push VLAN tag
                match = parser.OFPMatch(in_port=port)
                actions = [
                    parser.OFPActionPushVlan(0x8100),
                    parser.OFPActionSetField(vlan_vid=vid|0x1000),
                    parser.OFPActionOutput(ofp.OFPP_NORMAL)
                ]
                inst = [parser.OFPInstructionActions(
                    ofp.OFPIT_APPLY_ACTIONS, actions)]
                dp.send_msg(parser.OFPFlowMod(
                    datapath=dp, priority=50,
                    match=match, instructions=inst))

        # Rule 2: Pop VLAN khi ra host port
        for host, vid in TENANT_VLAN.items():
            port = self.host_to_port(host, dp.id)
            if port:
                match = parser.OFPMatch(
                    vlan_vid=vid|0x1000)
                actions = [
                    parser.OFPActionPopVlan(),
                    parser.OFPActionOutput(port)
                ]
                inst = [parser.OFPInstructionActions(
                    ofp.OFPIT_APPLY_ACTIONS, actions)]
                dp.send_msg(parser.OFPFlowMod(
                    datapath=dp, priority=50,
                    match=match, instructions=inst))

        # Rule 3: Block cross-VLAN (implicit — không có flow)
        self.logger.info("VLAN isolation configured on %d", dp.id)

    def host_to_port(self, host_name, dpid):
        """Override với actual port mapping"""
        return None  # implement with topology info` },
      { t:'Verify isolation', lang:'bash', info:'Test VLAN isolation:', code:`# Same tenant — PING được
mininet> h11 ping -c 3 h12   # VLAN 10 → VLAN 10: OK

# Cross tenant — PING không được
mininet> h11 ping -c 3 h21   # VLAN 10 → VLAN 20: BLOCKED
mininet> h21 ping -c 3 h31   # VLAN 20 → VLAN 30: BLOCKED

# Xem VLAN trong flow table
mininet> sh ovs-ofctl dump-flows s0 | grep vlan` },
      { t:'VLAN stats', lang:'bash', info:'Monitor traffic per tenant:', code:`# Port stats cho core switch
mininet> sh ovs-ofctl dump-ports s0
# Thấy: bytes/packets per port

# Flow stats theo VLAN
mininet> sh ovs-ofctl dump-flows s0 -O OpenFlow13 | grep vid=10
mininet> sh ovs-ofctl dump-flows s0 -O OpenFlow13 | grep vid=20` },
    ],
    expect:`Same-VLAN: ping OK\nCross-VLAN: 100% packet loss\nVLAN flows in switch: vid=10, vid=20, vid=30`,
    tips:['VLAN vid phải OR với 0x1000 (OFPVID_PRESENT bit)','Pop VLAN trước khi gửi cho host','Mỗi tenant cần ít nhất 2 flow: push (ingress) + pop (egress)','802.1Q overhead: +4 bytes mỗi frame'],
    verify:[
      { q:'VLAN 10 tự ping nhau?', cmd:'mininet> h11 ping -c 3 h12' },
      { q:'VLAN 10 không ping VLAN 20?', cmd:'mininet> h11 ping -c 3 h21' },
    ]
  },

  {
    id:'l13', group:'Nâng cao', groupColor:'#ffab40',
    title:'Lab 13: Link Failover & Recovery', diff:'hard', time:'120 phút',
    obj:'Implement fast failover khi link down với OpenFlow Fast-Failover Group.',
    theory:`OpenFlow Group Table (type=FAST_FAILOVER) cho phép switch tự động chuyển sang backup path khi primary link down — không cần packet-in đến controller. Recovery time < 50ms.`,
    steps:[
      { t:'Failover topology', lang:'python', info:'2 đường song song giữa 2 switch:', code:`from mininet.topo import Topo
from mininet.net import Mininet
from mininet.node import RemoteController, OVSSwitch
from mininet.link import TCLink, Link
from mininet.cli import CLI
import time

class FailoverTopo(Topo):
    """h1 — s1 = primary = s2 — h2
              = backup  =
    """
    def build(self):
        h1 = self.addHost('h1', ip='10.0.0.1/24')
        h2 = self.addHost('h2', ip='10.0.0.2/24')
        s1 = self.addSwitch('s1')
        s2 = self.addSwitch('s2')
        # 2 parallel links
        self.addLink(h1, s1)
        self.addLink(s1, s2, bw=100)  # primary
        self.addLink(s1, s2, bw=50)   # backup
        self.addLink(s2, h2)` },
      { t:'Fast Failover Group', lang:'python', info:'Ryu controller với Group Table:', code:`from ryu.base import app_manager
from ryu.controller import ofp_event
from ryu.controller.handler import (CONFIG_DISPATCHER, set_ev_cls)
from ryu.ofproto import ofproto_v1_3

class FailoverController(app_manager.RyuApp):
    OFP_VERSIONS = [ofproto_v1_3.OFP_VERSION]

    @set_ev_cls(ofp_event.EventOFPSwitchFeatures,
                CONFIG_DISPATCHER)
    def features_handler(self, ev):
        dp = ev.msg.datapath
        parser = dp.ofproto_parser
        ofp = dp.ofproto

        # Fast Failover Group
        # Bucket 0: primary path (port 2, watch_port=2)
        # Bucket 1: backup path (port 3, watch_port=3)
        buckets = [
            parser.OFPBucket(
                watch_port=2,     # monitor port 2
                watch_group=ofp.OFPG_ANY,
                actions=[parser.OFPActionOutput(2)]
            ),
            parser.OFPBucket(
                watch_port=3,     # failover to port 3
                watch_group=ofp.OFPG_ANY,
                actions=[parser.OFPActionOutput(3)]
            ),
        ]
        dp.send_msg(parser.OFPGroupMod(
            datapath=dp,
            command=ofp.OFPGC_ADD,
            type_=ofp.OFPGT_FF,   # FAST_FAILOVER
            group_id=1,
            buckets=buckets))

        # Flow: forward to group 1
        match = parser.OFPMatch(eth_type=0x800)
        actions = [parser.OFPActionGroup(group_id=1)]
        inst = [parser.OFPInstructionActions(
            ofp.OFPIT_APPLY_ACTIONS, actions)]
        dp.send_msg(parser.OFPFlowMod(
            datapath=dp, priority=10,
            match=match, instructions=inst))

        self.logger.info("Failover group configured on %d", dp.id)` },
      { t:'Test failover', lang:'python', info:'Simulate link failure:', code:`def test_failover(net):
    import time
    h1, h2 = net.get('h1', 'h2')
    s1, s2 = net.get('s1', 's2')

    print("=== Before failure ===")
    out = h1.cmd(f'ping -c 5 {h2.IP()}')
    print(out)

    # Ngắt primary link
    print("=== Breaking primary link ===")
    link = net.linksBetween(s1, s2)[0]
    link.intf1.ifconfig('down')
    link.intf2.ifconfig('down')
    time.sleep(1)  # Chờ failover kích hoạt

    print("=== After failover ===")
    out = h1.cmd(f'ping -c 5 {h2.IP()}')
    print(out)
    lost = int([l for l in out.split('\\n')
                if 'packet loss' in l][0].split('%')[0].split()[-1])
    print(f"Packet loss during failover: {lost}%")

    # Khôi phục
    link.intf1.ifconfig('up')
    link.intf2.ifconfig('up')
    print("=== Link restored ===")` },
      { t:'Measure recovery time', lang:'bash', info:'Đo thời gian failover:', code:`# Continuous ping trong khi kill link
mininet> h1 ping h2 &
# Trong khi ping đang chạy:
mininet> link s1 s2 down   # ngắt link primary
# Đếm số gói mất = recovery time × 1000ms

# Xem Group stats
mininet> sh ovs-ofctl dump-groups s1
mininet> sh ovs-ofctl dump-group-stats s1` },
    ],
    expect:`Recovery time: <100ms\nPacket loss during failover: <5%\nGroup table shows FAST_FAILOVER type`,
    tips:['FAST_FAILOVER tự động, không cần Packet-In','watch_port phải là port thực trong switch','Failover chỉ trong cùng switch — multi-hop cần ONOS/Faucet','Thêm watch_group cho failover group-level'],
    verify:[
      { q:'Group table cài đúng?', cmd:'mininet> sh ovs-ofctl dump-groups s1' },
      { q:'Traffic tiếp tục sau link down?', cmd:'mininet> link s1 s2 down' },
    ]
  },

  {
    id:'l14', group:'Nâng cao', groupColor:'#ffab40',
    title:'Lab 14: DDoS Detection & Mitigation', diff:'hard', time:'150 phút',
    obj:'Phát hiện và tự động chặn DDoS attack bằng SDN flow statistics.',
    theory:`SDN controller có thể monitor flow statistics real-time và phản ứng tự động. Khi phát hiện traffic bất thường (packet rate > threshold), controller cài flow DROP cho nguồn tấn công. Thời gian phản ứng < 10 giây.`,
    steps:[
      { t:'Stats collection', lang:'python', info:'Thu thập flow stats định kỳ:', code:`from ryu.base import app_manager
from ryu.controller import ofp_event
from ryu.controller.handler import (MAIN_DISPATCHER, set_ev_cls)
from ryu.ofproto import ofproto_v1_3
from ryu.lib import hub
import time, collections

class DDoSDetector(app_manager.RyuApp):
    OFP_VERSIONS = [ofproto_v1_3.OFP_VERSION]

    MONITOR_INTERVAL = 5   # giây
    THRESHOLD_PPS = 500    # packets/second → DDoS threshold

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.datapaths = {}
        self.flow_stats = collections.defaultdict(dict)
        self.blocked_ips = set()
        # Background thread thu thập stats
        self.monitor_thread = hub.spawn(self._monitor)

    def _monitor(self):
        """Định kỳ request stats từ tất cả switches"""
        while True:
            for dp in self.datapaths.values():
                self._request_stats(dp)
            hub.sleep(self.MONITOR_INTERVAL)

    def _request_stats(self, dp):
        parser = dp.ofproto_parser
        req = parser.OFPFlowStatsRequest(dp)
        dp.send_msg(req)

    @set_ev_cls(ofp_event.EventOFPFlowStatsReply,
                MAIN_DISPATCHER)
    def flow_stats_reply_handler(self, ev):
        dp = ev.msg.datapath
        now = time.time()

        for stat in ev.msg.body:
            src_ip = stat.match.get('ipv4_src')
            if not src_ip: continue

            key = (dp.id, src_ip)
            prev = self.flow_stats[key].get('stats')
            prev_time = self.flow_stats[key].get('time', now)

            self.flow_stats[key] = {
                'stats': stat,
                'time': now,
            }

            if prev:
                dt = now - prev_time
                dp_pkts = stat.packet_count - prev.packet_count
                pps = dp_pkts / dt if dt > 0 else 0

                if pps > self.THRESHOLD_PPS:
                    if src_ip not in self.blocked_ips:
                        self.logger.warning(
                            "DDoS detected! src=%s pps=%.0f",
                            src_ip, pps)
                        self._block_ip(dp, src_ip)` },
      { t:'Auto-block', lang:'python', info:'Tự động cài DROP rule:', code:`    def _block_ip(self, dp, src_ip):
        """Cài DROP flow cho IP tấn công"""
        parser = dp.ofproto_parser
        ofp = dp.ofproto

        match = parser.OFPMatch(
            eth_type=0x800,
            ipv4_src=src_ip)
        # Priority cao → match trước flow bình thường
        # instructions=[] → DROP
        dp.send_msg(parser.OFPFlowMod(
            datapath=dp,
            priority=1000,
            match=match,
            instructions=[],
            hard_timeout=300))  # auto-unblock sau 5 phút

        self.blocked_ips.add(src_ip)
        self.logger.info("BLOCKED: %s for 300s", src_ip)

    def _unblock_ip(self, dp, src_ip):
        """Xóa block rule (manual hoặc timeout)"""
        parser = dp.ofproto_parser
        ofp = dp.ofproto
        match = parser.OFPMatch(
            eth_type=0x800, ipv4_src=src_ip)
        dp.send_msg(parser.OFPFlowMod(
            datapath=dp,
            command=ofp.OFPFC_DELETE,
            priority=1000,
            match=match))
        self.blocked_ips.discard(src_ip)
        self.logger.info("UNBLOCKED: %s", src_ip)` },
      { t:'Simulate attack', lang:'python', info:'Tạo traffic flood để test:', code:`# attacker.py — flood traffic
import socket, time, threading

def flood(target_ip, port=80, rate=1000):
    """Gửi UDP flood packets"""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    payload = b'X' * 64
    count = 0
    start = time.time()
    while True:
        s.sendto(payload, (target_ip, port))
        count += 1
        if count % 100 == 0:
            elapsed = time.time() - start
            print(f"Sent {count} packets in {elapsed:.1f}s "
                  f"= {count/elapsed:.0f} pps")
        time.sleep(1/rate)  # rate control` },
      { t:'Test detection', lang:'bash', info:'Chạy attack và observe detection:', code:`# Terminal 1: Ryu DDoS detector
ryu-manager ddos_detector.py

# Terminal 2: Mininet
sudo mn --topo single,3 --mac \
        --controller=remote,ip=127.0.0.1,port=6653

# Terminal 3 (bên trong mininet xterm):
mininet> xterm h1
# Trong xterm h1: chạy flood
# python3 attacker.py 10.0.0.2 port=80 rate=600

# Quan sát Ryu log:
# DDoS detected! src=10.0.0.1 pps=612
# BLOCKED: 10.0.0.1 for 300s

# Verify block
mininet> h1 ping -c 3 h2   # blocked
mininet> h3 ping -c 3 h2   # not blocked` },
    ],
    expect:`DDoS detected! src=10.0.0.1 pps=612\nBLOCKED: 10.0.0.1\nh1 ping h2: 100% loss (blocked)\nh3 ping h2: 0% loss`,
    tips:['THRESHOLD_PPS điều chỉnh theo môi trường','hard_timeout tự xóa block rule sau timeout','Monitor interval nhỏ = phát hiện nhanh hơn nhưng tốn CPU','Kết hợp với IP reputation cho độ chính xác cao hơn'],
    verify:[
      { q:'Stats collection chạy?', cmd:'mininet> sh ovs-ofctl dump-flows s1 | wc -l' },
      { q:'Block rule được cài?', cmd:'mininet> sh ovs-ofctl dump-flows s1 | grep drop' },
    ]
  },

  {
    id:'l15', group:'Nâng cao', groupColor:'#ffab40',
    title:'Lab 15: Monitoring Dashboard', diff:'hard', time:'180 phút',
    obj:'Xây dựng real-time monitoring dashboard với Flask và Chart.js.',
    theory:`SDN controller expose REST API để lấy topology và statistics. Flask backend thu thập data từ Ryu, WebSocket push update real-time đến browser. Chart.js hiển thị bandwidth và latency theo thời gian.`,
    steps:[
      { t:'Ryu REST API', lang:'python', info:'Ryu expose stats qua REST:', code:`from ryu.app.wsgi import ControllerBase, WSGIApplication, route
from webob import Response
import json

class MonitoringREST(ControllerBase):
    def __init__(self, req, link, data, **config):
        super().__init__(req, link, data, **config)
        self.monitor = data['monitor']

    @route('monitor', '/api/switches', methods=['GET'])
    def list_switches(self, req, **kw):
        switches = list(self.monitor.datapaths.keys())
        return Response(
            content_type='application/json',
            body=json.dumps({'switches': switches}))

    @route('monitor', '/api/stats/{dpid}', methods=['GET'])
    def get_stats(self, req, **kw):
        dpid = int(kw['dpid'])
        stats = self.monitor.port_stats.get(dpid, {})
        return Response(
            content_type='application/json',
            body=json.dumps(stats))

    @route('monitor', '/api/topology', methods=['GET'])
    def get_topology(self, req, **kw):
        topo = {
            'switches': list(self.monitor.datapaths.keys()),
            'links': self.monitor.links,
            'hosts': self.monitor.hosts,
        }
        return Response(
            content_type='application/json',
            body=json.dumps(topo))` },
      { t:'Flask Dashboard', lang:'python', info:'dashboard.py — web server:', code:`from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO, emit
import requests, time, threading

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

RYU_API = "http://localhost:8080"
bw_history = {}

def collect_stats():
    """Background thread thu thập và push stats"""
    while True:
        try:
            # Lấy danh sách switches
            r = requests.get(f"{RYU_API}/api/switches")
            switches = r.json().get('switches', [])

            for dpid in switches:
                # Lấy port stats
                r = requests.get(f"{RYU_API}/api/stats/{dpid}")
                stats = r.json()

                # Tính bandwidth
                bw_data = {}
                for port, s in stats.items():
                    bw_data[port] = {
                        'tx_bps': s.get('tx_bytes', 0) * 8,
                        'rx_bps': s.get('rx_bytes', 0) * 8,
                    }

                # Push qua WebSocket
                socketio.emit('stats_update', {
                    'dpid': dpid,
                    'data': bw_data,
                    'time': time.time()
                })
        except Exception as e:
            print(f"Error: {e}")
        time.sleep(2)  # update mỗi 2 giây

@app.route('/')
def index():
    return render_template('dashboard.html')

@app.route('/api/topology')
def topology():
    r = requests.get(f"{RYU_API}/api/topology")
    return jsonify(r.json())

if __name__ == '__main__':
    thread = threading.Thread(target=collect_stats)
    thread.daemon = True
    thread.start()
    socketio.run(app, host='0.0.0.0', port=5000)` },
      { t:'HTML Dashboard', lang:'html', info:'templates/dashboard.html:', code:`<!DOCTYPE html>
<html>
<head>
  <title>SDN Monitor</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.socket.io/4.5.0/socket.io.min.js"></script>
  <style>
    body { background:#0a0e1a; color:#e0e6f0; font-family:sans-serif; }
    .grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem; padding:1rem; }
    .card { background:#141927; border:1px solid #1e2a40; border-radius:10px; padding:1rem; }
    h3 { color:#00d4ff; margin-bottom:.5rem; }
    canvas { max-height:200px; }
  </style>
</head>
<body>
  <h1 style="text-align:center;color:#00d4ff;padding:1rem">SDN Monitoring Dashboard</h1>
  <div class="grid">
    <div class="card">
      <h3>Bandwidth (Mbps)</h3>
      <canvas id="bwChart"></canvas>
    </div>
    <div class="card">
      <h3>Packet Rate (pps)</h3>
      <canvas id="ppsChart"></canvas>
    </div>
  </div>
  <script>
    const ctx1 = document.getElementById('bwChart').getContext('2d');
    const bwChart = new Chart(ctx1, {
      type: 'line',
      data: { labels: [], datasets: [{
        label: 'TX Mbps', data: [],
        borderColor:'#00d4ff', fill:false
      },{
        label: 'RX Mbps', data: [],
        borderColor:'#00e676', fill:false
      }]},
      options: { animation:false, scales:{y:{min:0}} }
    });

    const socket = io();
    socket.on('stats_update', data => {
      const now = new Date().toLocaleTimeString();
      if (bwChart.data.labels.length > 30)
        bwChart.data.labels.shift();
      bwChart.data.labels.push(now);
      const bw = Object.values(data.data)[0] || {};
      bwChart.data.datasets[0].data.push(
        ((bw.tx_bps||0)/1e6).toFixed(2));
      bwChart.data.datasets[1].data.push(
        ((bw.rx_bps||0)/1e6).toFixed(2));
      bwChart.update();
    });
  </script>
</body>
</html>` },
      { t:'Chạy toàn bộ', lang:'bash', info:'3 terminal cùng lúc:', code:`# Terminal 1: Ryu với monitoring app
ryu-manager --wsapi-port=8080 monitoring_app.py

# Terminal 2: Mininet tạo traffic
sudo mn --topo linear,4 \
        --controller=remote,ip=127.0.0.1,port=6653
mininet> h1 iperf3 -s &
mininet> h4 iperf3 -c 10.0.0.1 -t 60 &

# Terminal 3: Dashboard
pip3 install flask flask-socketio
python3 dashboard.py

# Mở browser: http://localhost:5000` },
    ],
    expect:`Dashboard at http://localhost:5000\nReal-time charts updating every 2s\nBandwidth visible during iperf3 test`,
    tips:['Flask-SocketIO cần eventlet hoặc gevent','Ryu WSGI chạy ở port 8080 mặc định','Chart.js animation:false cho real-time performance','Dùng Redis để lưu history nếu cần persistence'],
    verify:[
      { q:'Ryu REST hoạt động?', cmd:'curl http://localhost:8080/api/switches' },
      { q:'Dashboard load?', cmd:'curl http://localhost:5000' },
    ]
  },
]

export const LAB_GROUPS = [
  { id:'Cơ bản', color:'#00e676', count: LABS.filter(l=>l.group==='Cơ bản').length },
  { id:'Trung cấp', color:'#00d4ff', count: LABS.filter(l=>l.group==='Trung cấp').length },
  { id:'SDN Controller', color:'#c792ea', count: LABS.filter(l=>l.group==='SDN Controller').length },
  { id:'Nâng cao', color:'#ffab40', count: LABS.filter(l=>l.group==='Nâng cao').length },
]
